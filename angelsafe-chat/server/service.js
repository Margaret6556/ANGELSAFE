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


  // { id: 123
  //   participants: ['user1', 'user2'],
  // }

  // { 
  //   sender: 'user1', 
  //   message: 'Hello World', 
  //   timestamp: time,
  //   converstationId: 123
  // }

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json(error);
  });
  return service;
};