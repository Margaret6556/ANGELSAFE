const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const service = express();

const DB = require('./lib/DB');
const Chat = require('./lib/Chat');

module.exports = (config) => {
  const log = config.log();
  const DBHelper = new DB(config);
  const ChatService = new Chat(config);

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.use(cors());
  service.use(express.json());

  service.post('/create', async (req, res, next) => {
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
      if (!Chat.isRequestValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
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
      try{
        DB.getObjectId(decodedAuth.data.id);
        DB.getObjectId(data.receiverId);
      } catch(err){
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const insertResult = await DBHelper.getCollection(config.chatCollection).insertOne(
        {
          participants: [DB.getObjectId(decodedAuth.data.id), DB.getObjectId(data.receiverId)],
          sender: DB.getObjectId(decodedAuth.data.id),
          receiver: DB.getObjectId(data.receiverId),
          timestamp: new Date().valueOf(),
          message: data.message
        }
      );
      log.debug(insertResult);
      if (!insertResult.insertedId) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Creating Message Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/view', async (req, res, next) => {
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
      if (!Chat.isRequestViewValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const messages = await DBHelper
        .getCollection(config.chatCollection)
        .find({ 
          $and: [
            { participants: { $in: [DB.getObjectId(decodedAuth.data.id)] }},
            { participants: { $in: [DB.getObjectId(data.receiverId)] }}
          ]
        }).sort( { timestamp: 1 } ).toArray();
      let newMessages = [];
      messages.forEach((message)=>{
        newMessages.push({
          id: message._id.toString(),
          timestamp: message.timestamp,
          message: message.message,
          sender: message.sender,
          receiver: message.receiver
        });
      });
      result.status = 200;
      result.error = null;
      result.message = 'Getting Messages Successful';
      result.data = newMessages;
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