const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const service = express();

const DB = require('./lib/DB');
const Group = require('./lib/Group');

module.exports = (config) => {
  const log = config.log();
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
      let token = req.headers.authorization ? req.headers.authorization.slice(7) : '';
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      if (!Group.isGroupnameValid(data.groupname)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Groupname';
        throw result;
      }
      if (!Group.isDescriptionValid(data.description)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Description';
        throw result;
      }
      const isExisting = await DBHelper
        .getCollection(config.groupCollection)
        .findOne({ groupname: data.groupname });
      if (isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Existing Groupname';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.groupCollection).updateOne(
        { ownerId: DB.getObjectId(decodedAuth.data.id) },
        {
          $set: {
            lastUpdateTimestamp: new Date().valueOf(),
            groupname: data.groupname,
            description: data.description,
            profilePic: 'data:image/png;base64,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',
            members: [DB.getObjectId(decodedAuth.data.id)],
            banned: []
          }
        },
        { upsert: true }
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount && !updatedResult.upsertedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Creating Group Successful';
        result.data = {
          id: decodedAuth.data.id,
          message: `You have created the ${data.groupname} group.`
        };
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/update', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestUpdateValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      if(data.description)
        if (!Group.isDescriptionValid(data.description)) {
          result.status = 400;
          result.error = 'Bad Request';
          result.message = 'Invalid Description';
          throw result;
        }
      if(data.groupname){
        if (!Group.isGroupnameValid(data.groupname)) {
          result.status = 400;
          result.error = 'Bad Request';
          result.message = 'Invalid Groupname';
          throw result;
        }
        const isExisting = await DBHelper
          .getCollection(config.groupCollection)
          .findOne({ groupname: data.groupname, ownerId: { $ne: DB.getObjectId(decodedAuth.data.id) } });
        if (isExisting) {
          result.status = 400;
          result.error = 'Bad Request';
          result.message = 'Existing Groupname';
          throw result;
        }
      }
      data.lastUpdateTimestamp = new Date().valueOf();
      delete data['ip'];
      const updatedResult = await DBHelper.getCollection(config.groupCollection).updateOne(
        { ownerId: DB.getObjectId(decodedAuth.data.id) },
        {
          $set: data
        }
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
        result.message = 'Updating Group Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/update-pic', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestUpdatePicValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const profilePicValid = await Group.isProfilePicValid(data.profilePic);
      if (profilePicValid) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Group Picture';
        throw result;
      }
      data.lastUpdateTimestamp = new Date().valueOf();
      const updatedResult = await DBHelper.getCollection(config.groupCollection).updateOne(
        { ownerId: DB.getObjectId(decodedAuth.data.id) },
        {
          $set: {
            profilePic: data.profilePic
          }
        }
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
        result.message = 'Updating Group Picture Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/info', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestJoinValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const isExisting = await DBHelper
        .getCollection(config.groupCollection)
        .findOne({ _id: DB.getObjectId(data.groupId) });
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Group is not existing';
        throw result;
      }
      result.status = 200;
      result.error = null;
      result.message = 'Getting Group Successful';
      result.data = {
        id: isExisting._id.toString(),
        groupname: isExisting.groupname,
        profilePic: isExisting.profilePic,
        description: isExisting.description
      };
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/join', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestJoinValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const isExisting = await DBHelper
        .getCollection(config.groupCollection)
        .findOne({ _id: DB.getObjectId(data.groupId), ownerId: { $ne: DB.getObjectId(decodedAuth.data.id) }, banned: { $nin: [DB.getObjectId(decodedAuth.data.id)]} });
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Group not existing';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.groupCollection).updateOne(
        { _id: DB.getObjectId(data.groupId) },
        {
          $set: {
            lastUpdateTimestamp: new Date().valueOf(),
          },
          $addToSet: {
            members: DB.getObjectId(decodedAuth.data.id),
          }
        }
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount && !updatedResult.upsertedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Joining Group Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/unjoin', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestJoinValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      let isExisting = await DBHelper
        .getCollection(config.groupCollection)
        .findOne({ _id: DB.getObjectId(data.groupId), ownerId: { $ne: DB.getObjectId(decodedAuth.data.id) } });
      if(!isExisting){
        isExisting = await DBHelper
        .getCollection(config.groupCollection)
        .findOne({ _id: DB.getObjectId(data.groupId), ownerId: DB.getObjectId(decodedAuth.data.id) });
        if(isExisting && isExisting.members.length > 1 ){
          result.status = 400;
          result.error = 'Bad Request';
          result.message = 'Group cannot be deleted if there are more than one member';
          throw result;
        }
      }
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Group not existing';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.groupCollection).updateOne(
        { _id: DB.getObjectId(data.groupId) },
        {
          $set: {
            lastUpdateTimestamp: new Date().valueOf(),
          },
          $pull: {
            members: DB.getObjectId(decodedAuth.data.id),
          }
        }
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount && !updatedResult.upsertedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Removing Group Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/members', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestJoinValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      let skip = 0;
      if(data.skip)
        skip = parseInt(data.skip);
      const isExisting = await DBHelper
        .getCollection(config.groupCollection)
        .findOne({ _id: DB.getObjectId(data.groupId) });
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Group not existing';
        throw result;
      }
      result.status = 200;
      result.error = null;
      result.message = 'Getting Group Members Successful';
      result.data = isExisting.members.slice(skip, skip + 20);
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.get('/list', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      let options = {};
      let skip = 0;
      if(data.groupname)
        options['groupname'] = {'$regex' : `.*${data.groupname}.*`, '$options' : 'i'};
      if(data.joined && data.joined == 1)
        options['members'] = { $in: [DB.getObjectId(decodedAuth.data.id)] };
      if(data.joined && data.joined == 0)
        options['members'] = { $nin: [DB.getObjectId(decodedAuth.data.id)] };
      if(data.skip)
        skip = parseInt(data.skip);
      const groups = await DBHelper
        .getCollection(config.groupCollection)
        .find(options).skip(skip).limit(30).toArray();
      let newGroups = [];
      groups.forEach((group)=>{
        newGroups.push({
          id: group._id.toString(),
          groupname: group.groupname,
          description: group.description,
          profilePic: group.profilePic,
        });
      });
      result.status = 200;
      result.error = null;
      result.message = 'Getting Groups Successful';
      result.data = newGroups;
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/ban', async (req, res, next) => {
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
      let decodedAuth = null;
      if (!token) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      try {
        decodedAuth = jwt.verify(token.toString(), config.iamHash);
      } catch (err) {
        result.status = 401;
        result.error = 'Unauthorized';
        result.message = 'Invalid Login Credentials';
        throw result;
      }
      if (!Group.isRequestBanValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      if (decodedAuth.data.id == data.id) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Cannot ban yourself';
        throw result;
      }
      let isExisting = await DBHelper
        .getCollection(config.groupCollection)
        .findOne({ _id: DB.getObjectId(data.groupId), ownerId: DB.getObjectId(decodedAuth.data.id) });
      if (!isExisting) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Group not existing';
        throw result;
      }
      if (isExisting._id.toString() == data.id) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Cannot ban admin';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.groupCollection).updateOne(
        { _id: DB.getObjectId(data.groupId) },
        {
          $set: {
            lastUpdateTimestamp: new Date().valueOf(),
          },
          $pull: {
            members: DB.getObjectId(data.id),
          },
          $addToSet: {
            banned: DB.getObjectId(data.id),
          }
        }
      );
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount && !updatedResult.upsertedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Banning Member Successful';
        result.data = {
          id: data.id,
          message: `You are now banned from the ${isExisting.groupname} group.`
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