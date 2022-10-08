const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const service = express();

const DB = require('./lib/DB');
const Users = require('./lib/Users');
const MobileNumber = require('./lib/MobileNumber');

module.exports = (config) => {
  const log = config.log();

  const users = new Users();
  const DBHelper = new DB(config);

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
      // if (!Users.isPasswordValid(data.password)) {
      //   result.status = 400;
      //   result.error = 'Bad Request';
      //   result.message = 'Invalid Password';
      //   throw result;
      // }
      if (!MobileNumber.validateNumber(data.mobileNumber, config.countryCode)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Mobile Number';
        throw result;
      }
      data.mobileNumber = MobileNumber.validateNumberFormat(data.mobileNumber, config.countryCode);
      const isExisting = await DBHelper
        .getCollection(config.usersCollection)
        .findOne({ mobileNumber: data.mobileNumber });
      if (isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Existing Mobile Number';
        throw result;
      }
      data.timestamp = new Date().valueOf();
      data.otpTimestamp = data.timestamp;
      data.otp = 123456;// TODO Users.generateOTP(config.OTPMax);
      // data.password = Users.encryptPassword(data.password, config.iamHash);
      data.mfa = [Users.MFA.mobileNumber];
      const insertResult = await DBHelper.getCollection(config.usersCollection).insertOne(data);
      log.debug(insertResult);
      if (!insertResult.insertedId) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        // TODO send OTP to SMS
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
    try {
      switch(data.mfa){
        case Users.MFA.mobileNumber.toString():
          if (!Users.isRequestAuthValid(req.headers.authorization, Integer.parseInt(data.mfa))) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Authorization';
            throw result;
          }
          data.mobileNumber = Users.getRequestAuth(req.headers.authorization, Integer.parseInt(data.mfa));
          if (!Users.isRequestOTPValid(data)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Data';
            throw result;
          }
          if (!MobileNumber.validateNumber(data.mobileNumber, config.countryCode)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Mobile Number';
            throw result;
          }
          data.mobileNumber = MobileNumber.validateNumberFormat(data.mobileNumber, config.countryCode);
          const isExisting = await DBHelper
            .getCollection(config.usersCollection)
            .findOne({
              mobileNumber: data.mobileNumber,
              otp: data.otp,
              otpTimestamp: { $gte: (new Date().valueOf() - 86400000) },
            });
          if (!isExisting) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Mobile Number and OTP combination is not valid!';
            throw result;
          }
          const token = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            data: { id: isExisting._id.toString(), timestamp: new Date().valueOf() },
          }, config.iamHash, { expiresIn: '1h' });
          const updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
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
          if (!Users.isRequestEmailLoginValid(data)) {
            result.status = 400;
            result.error = 'Bad Request';
            result.message = 'Invalid Data';
            throw result;
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
      if (!MobileNumber.validateNumber(data.mobileNumber, config.countryCode)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Mobile Number';
        throw result;
      }
      data.mobileNumber = MobileNumber.validateNumberFormat(data.mobileNumber, config.countryCode);
      const isExisting = await DBHelper
        .getCollection(config.usersCollection)
        .findOne({ mobileNumber: data.mobileNumber });
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Mobile Number is not registered!';
        throw result;
      }
      const otp = 123456;// TODO Users.generateOTP(config.OTPMax);
      const updatedResult = await DBHelper.getCollection(config.usersCollection).updateOne(
        { mobileNumber: data.mobileNumber },
        {
          $set: {
            otpTimestamp: new Date().valueOf(),
            otp: otp.toString(),
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
        // TODO send OTP to SMS
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

  service.post('/refresh-token', async (req, res, next) => {
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
      if (!Users.isRequestTokenValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
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
        // TODO send OTP to SMS
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
          userName: findResult.username,
          profilePic: findResult.profilePic,
        };
      }
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