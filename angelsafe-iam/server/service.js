const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const service = express();

const DB = require('./lib/DB');
const Users = require('./lib/Users');
const MobileNumber = require('./lib/MobileNumber');
const Emailer = require('./lib/Emailer');
const SMS = require('./lib/SMS');

module.exports = (config) => {
  const log = config.log();

  const users = new Users();
  const DBHelper = new DB(config);
  const EmailHelper = new Emailer(config);
  const SMSHelper = new SMS(config);

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.use(cors());
  service.use(express.json());

  service.get('/list', async (req, res, next) => {
    try {
      return res.json(await users.getList());
    } catch (err) {
      return next(err);
    }
  });

  service.post('/register', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    const data = {
      ...req.query,
      ...req.body,
    };
    try {
      if (!Users.isRequestValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      if (!MobileNumber.validateNumber(data.mobileNumber)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Mobile Number';
        throw result;
      }
      data.mobileNumber = MobileNumber.validateNumberFormat(data.mobileNumber);
      const isExisting = await DBHelper.getCollection(config.usersCollection).findOne({ mobileNumber: data.mobileNumber });
      if (isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Existing Mobile Number';
        throw result;
      }
      data.timestamp = new Date().valueOf();
      data.otpTimestamp = data.timestamp;
      data.otp = Users.generateOTP(config.OTPMax);
      data.mfa = [Users.MFA.mobileNumber];
      const insertResult = await DBHelper.getCollection(config.usersCollection).insertOne(data);
      log.debug(insertResult);
      if (!insertResult.insertedId) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        try{
          SMSHelper.sendSMS(data.mobileNumber, `Your OTP for AngelSafe is: ${data.otp}`);
        } catch(err){
          log.debug(err);
        }
        log.debug('OTP: ', data.otp);
        result.status = 200;
        result.error = null;
        result.message = 'Registration Successful';
        result.data = { mobileNumber: data.mobileNumber };
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/register-email', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    const data = {
      ...req.query,
      ...req.body,
    };
    try {
      let token = req.headers.authorization ? req.headers.authorization.slice(7) : '';
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Users.isRequestEmailValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      if (!Users.isPasswordValid(data.password)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Password';
        throw result;
      }
      if (!Users.isEmailValid(data.email)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Email Address';
        throw result;
      }
      const isExisting = await DBHelper
        .getCollection(config.usersCollection)
        .findOne({ email: data.email, token: { $ne: token} });
      if (isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Existing Email Address';
        throw result;
      }
      data.password = Users.encryptPassword(data.password);
      const code = (new Date().valueOf() + Users.generateOTP(5)).toString();
      const updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
        { token },
        {
          $set: {
            lastLoginTimestamp: new Date().valueOf(),
            email: data.email,
            emailVerified: 0,
            emailVerificationCode: code,
            password: data.password,
          },
          $addToSet: { mfa: Users.MFA.email }
        },
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        try{
          EmailHelper.sendMail(
            data.email, 
            'AngelSafe Registration', 
            `Welcome to AngelSafe Community. Kindly validate your email by visiting this page, http://localhost:3001/verify-email/${code}`
          );
        } catch(err){
          log.debug(err);
        }
        result.status = 200;
        result.error = null;
        result.message = 'Registration Successful';
        result.data = { email: data.email };
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/login', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    const data = {
      ...req.query,
      ...req.body,
    };
    let isExisting = null;
    let token = null;
    let updatedResult = null;
    try {
      switch(data.mfa){
        case Users.MFA.mobileNumber.toString():
          if (!Users.isRequestAuthValid(req.headers.authorization, parseInt(data.mfa))) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Authorization';
            throw result;
          }
          data.mobileNumber = Users.getRequestAuth(req.headers.authorization, parseInt(data.mfa));
          if (!Users.isRequestOTPValid(data)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Data';
            throw result;
          }
          if (!MobileNumber.validateNumber(data.mobileNumber)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Mobile Number';
            throw result;
          }
          data.mobileNumber = MobileNumber.validateNumberFormat(data.mobileNumber);
          isExisting = await DBHelper
            .getCollection(config.usersCollection)
            .findOne({
              mobileNumber: data.mobileNumber,
              otp: parseInt(data.otp),
              otpTimestamp: { $gte: (new Date().valueOf() - 86400000) },
            });
          if (!isExisting) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Mobile Number and OTP combination is not valid!';
            throw result;
          }
          token = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            data: { id: isExisting._id.toString(), timestamp: new Date().valueOf() },
          }, config.iamHash, { expiresIn: '1h' });
          updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
            { mobileNumber: data.mobileNumber },
            {
              $set: {
                lastLoginTimestamp: new Date().valueOf(),
                token,
                ip: data.ip,
              },
            },
          );
          log.debug(updatedResult);
          if (!updatedResult.modifiedCount) {
            result.status = 500;
            result.error = 'Internal Server Error';
            result.message = 'Something is wrong';
            throw result;
          } else {
            log.debug('Token: ', token);
            result.status = 200;
            result.error = null;
            result.message = 'Getting Token Successful';
            result.data = { token };
          }
          break;
        case Users.MFA.email.toString():
          if (!Users.isRequestAuthValid(req.headers.authorization, parseInt(data.mfa))) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Authorization';
            throw result;
          }
          const splittedData = Users.getRequestAuth(req.headers.authorization, parseInt(data.mfa));
          data.email = splittedData[0];
          data.password = splittedData[1];
          if (!Users.isRequestEmailLoginValid(data)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Data';
            throw result;
          }
          if (!Users.isPasswordValid(data.password)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Password';
            throw result;
          }
          if (!Users.isEmailValid(data.email)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Email Address';
            throw result;
          }
          isExisting = await DBHelper
            .getCollection(config.usersCollection)
            .findOne({
              email: data.email,
              emailVerified: 1
            });
          if (!isExisting) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Email Address is not verified or existing!';
            throw result;
          }
          if(!Users.validatePassword(isExisting.password, data.password)){
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Email Address and Password combination is not valid!';
            throw result;
          }
          token = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            data: { id: isExisting._id.toString(), timestamp: new Date().valueOf() },
          }, config.iamHash, { expiresIn: '1h' });
          updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
            { email: data.email },
            {
              $set: {
                lastLoginTimestamp: new Date().valueOf(),
                token,
                ip: data.ip,
              },
            },
          );
          log.debug(updatedResult);
          if (!updatedResult.modifiedCount) {
            result.status = 500;
            result.error = 'Internal Server Error';
            result.message = 'Something is wrong';
            throw result;
          } else {
            log.debug('Token: ', token);
            result.status = 200;
            result.error = null;
            result.message = 'Getting Token Successful';
            result.data = { token };
          }
          break;
        case Users.MFA.fingerprint.toString():
          if (!Users.isRequestFingerprintLoginValid(data)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Data';
            throw result;
          }
          break;
        case Users.MFA.social.toString():
          if (!Users.isRequestSocialLoginValid(data)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Data';
            throw result;
          }
          break;
        default:
          result.status = 400;
          result.error = 'Bad Request';
          result.message = 'Invalid Data';
          throw result;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/otp', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    const data = {
      ...req.query,
      ...req.body,
    };
    try {
      if (!Users.isRequestValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      if (!MobileNumber.validateNumber(data.mobileNumber)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Mobile Number';
        throw result;
      }
      data.mobileNumber = MobileNumber.validateNumberFormat(data.mobileNumber);
      const isExisting = await DBHelper
        .getCollection(config.usersCollection)
        .findOne({ mobileNumber: data.mobileNumber });
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Mobile Number is not registered!';
        throw result;
      }
      const otp = Users.generateOTP(config.OTPMax);
      const updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
        { mobileNumber: data.mobileNumber },
        {
          $set: {
            otpTimestamp: new Date().valueOf(),
            otp: parseInt(otp),
            ip: data.ip,
          },
        },
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        try{
          SMSHelper.sendSMS(data.mobileNumber, `Your OTP for AngelSafe is: ${otp}`);
        } catch(err){
          log.debug(err);
        }
        log.debug('OTP: ', otp);
        result.status = 200;
        result.error = null;
        result.message = 'Sending OTP Successful';
        result.data = { mobileNumber: data.mobileNumber };
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/verify-email', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    const data = {
      ...req.query,
      ...req.body,
    };
    try {
      if (!Users.isRequestCodeValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
        { emailVerificationCode: data.code },
        {
          $set: {
            emailVerified: 1
          },
        },
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Email Address is verified';
        result.data = {};
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.get('/refresh-token', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    const data = {
      ...req.query,
      ...req.body,
    };
    try {
      let token = req.headers.authorization ? req.headers.authorization.slice(7) : '';
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      const isExisting = await DBHelper
        .getCollection(config.usersCollection)
        .findOne({
          token,
          lastLoginTimestamp: { $gte: (new Date().valueOf() - 3600000) },
        });
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Token is not valid!';
        throw result;
      }
      token = jwt.sign({
        // eslint-disable-next-line no-underscore-dangle
        data: { id: isExisting._id.toString(), timestamp: new Date().valueOf() },
      }, config.iamHash, { expiresIn: '1h' });
      const updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
        { mobileNumber: isExisting.mobileNumber },
        {
          $set: {
            lastLoginTimestamp: new Date().valueOf(),
            token,
            ip: data.ip,
          },
        },
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        log.debug('Token: ', token);
        result.status = 200;
        result.error = null;
        result.message = 'Getting Token Successful';
        result.data = { token };
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.get('/profile', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    try {
      const token = req.headers.authorization ? req.headers.authorization.slice(7) : '';
      let decoded = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decoded = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      // eslint-disable-next-line max-len
      const findResult = await DBHelper.getCollection(config.usersCollection).findOne({
        _id: decoded && decoded.data && decoded.data.id ? DB.getObjectId(decoded.data.id) : '',
      });
      log.debug(findResult);
      if (!findResult) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Profile Not Found';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Getting Profile Successful';
        result.data = {
          mobileNumber: findResult.mobileNumber,
          email: findResult.email
        };
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/verify-token', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    try {
      let decoded = null;
      try {
        decoded = jwt.verify(req.body.token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      result.status = 200;
      result.error = null;
      result.message = 'Verifying Token Successful';
      result.data = {
        id: decoded.data.id
      };
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json(error);
  });
  return service;
};