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
      const insertedResult = await DBHelper.getCollection(config.groupCollection).insertOne(
        {
          ownerId: DB.getObjectId(decodedAuth.data.id),
          lastUpdateTimestamp: new Date().valueOf(),
          groupname: data.groupname,
          description: data.description,
          profilePic: 'data:image/png;base64,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',
          members: [DB.getObjectId(decodedAuth.data.id)],
          banned: []
        }
      );
      log.debug(insertedResult);
      if (!insertedResult || !insertedResult.insertedId) {
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
          groupId: insertedResult.insertedId,
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
        { ownerId: DB.getObjectId(decodedAuth.data.id), _id: DB.getObjectId(data.groupId) },
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
      let online = 0;
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
      if (!Group.isRequestInfoValid(data)) {
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
      isExisting.members.forEach((member)=>{
        if(data.clients.indexOf(member.toString()) > -1)
          online++;
      });
      result.status = 200;
      result.error = null;
      result.message = 'Getting Group Successful';
      result.data = {
        id: isExisting._id.toString(),
        groupname: isExisting.groupname,
        profilePic: isExisting.profilePic,
        description: isExisting.description,
        members: isExisting.members.length,
        joined:  isExisting.members.indexOf(decodedAuth.data.id) > -1? 1:0,
        online
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

  service.post('/all-members', async (req, res, next) => {
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
        result.message = 'Group not existing';
        throw result;
      }
      result.status = 200;
      result.error = null;
      result.message = 'Getting Group Members Successful';
      result.data = isExisting.members;
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

  service.post('/verify', async (req, res, next) => {
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
        .findOne({
          _id: DB.getObjectId(data.groupId),
          members: {  $in: [decodedAuth.data.id]}
        });
      if (!isExisting) {
        result.status = 200;
        result.error = null;
        result.message = 'Verifying Member Successful';
        result.data = false;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Verifying Member Successful';
        result.data = true;
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