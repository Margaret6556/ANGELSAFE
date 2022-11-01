const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const service = express();

const DB = require('./lib/DB');
const Notif = require('./lib/Notif');

module.exports = (config) => {
  const log = config.log();
  const DBHelper = new DB(config);
  const NotifService = new Notif(config);

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
      if (!Notif.isRequestValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const insertedResult = await DBHelper.getCollection(config.notifCollection).insertOne(
        {
          ownerId: DB.getObjectId(data.id),
          timestamp: new Date().valueOf(),
          message: data.message,
          profilePic: data.profilePic,
          groupname: data.groupname,
          groupId: data.groupId,
          read: 0
        }
      );
      log.debug(insertedResult);
      if (!insertedResult) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Creating Notification Successful';
        result.data = null;
      }
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
      const notifs = await DBHelper
        .getCollection(config.notifCollection)
        .find({ 'ownerId': DB.getObjectId(decodedAuth.data.id) }).sort({ timestamp: -1 }).toArray();
      let newNotifs = [];
      notifs.forEach((notif)=>{
        newNotifs.push({
          timestamp: notif.timestamp,
          message: notif.message,
          read: notif.read,
          profilePic: notif.profilePic,
          groupname: notif.groupname,
          groupId: notif.groupId,
        });
      });
      DBHelper
        .getCollection(config.notifCollection)
        .updateMany({ 'ownerId': DB.getObjectId(decodedAuth.data.id) }, { $set: {read: 1}});
      result.status = 200;
      result.error = null;
      result.message = 'Getting Notifications Successful';
      result.data = newNotifs;
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