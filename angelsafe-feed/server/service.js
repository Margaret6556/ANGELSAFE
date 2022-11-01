const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const service = express();

const DB = require('./lib/DB');
const Feed = require('./lib/Feed');

module.exports = (config) => {
  const log = config.log();
  const DBHelper = new DB(config);
  const FeedService = new Feed(config);

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
      if (!Feed.isRequestValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      let start = new Date();
      start.setHours(0,0,0,0);
      let end = new Date();
      end.setHours(23,59,59,999);
      const upsertedResult = await DBHelper.getCollection(config.statCollection).updateOne({
        timestamp: {$gte: start.valueOf(), $lt: end.valueOf()}
      },
      {
        $set: {
          ownerId: DB.getObjectId(decodedAuth.data.id),
          timestamp: new Date().valueOf(),
          stat: data.stat,
          experience: data.experience
        }
      },
      {
        upsert: true
      }
      );
      log.debug(upsertedResult);
      if (!upsertedResult.modifiedCount && !upsertedResult.upsertedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Updating Stat Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.get('/view', async (req, res, next) => {
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
      let start = new Date();
      start.setHours(0,0,0,0);
      let end = new Date();
      end.setHours(23,59,59,999);
      const findResult = await DBHelper.getCollection(config.statCollection).findOne({
        ownerId: DB.getObjectId(decodedAuth.data.id),
        timestamp: {$gte: start.valueOf(), $lt: end.valueOf()}
      });
      log.debug(result);
      result.status = 200;
      result.error = null;
      result.message = 'Getting Stat Successful';
      if(findResult)
        result.data = {
          id: findResult._id.toString(),
          stat: findResult.stat,
          experience: findResult.experience
        };
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.get('/wins', async (req, res, next) => {
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
      let start = new Date();
      start.setHours(0,0,0,0);
      let end = new Date();
      end.setHours(23,59,59,999);
      const winCount = await DBHelper.getCollection(config.statCollection).count({
        ownerId: DB.getObjectId(decodedAuth.data.id),
        $or: [{ stat: "1"}, { stat: "1"}]
      });
      const painCount = await DBHelper.getCollection(config.statCollection).count({
        ownerId: DB.getObjectId(decodedAuth.data.id),
        $or: [{ stat: "2"}, { stat: "3"}, { stat: "4"}, { stat: "5"}]
      });
      log.debug(result);
      result.status = 200;
      result.error = null;
      result.message = 'Getting Wins Successful';
      result.data = {
        winCount: winCount?winCount:0,
        painCount: painCount?painCount:0,
      };
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/create-post', async (req, res, next) => {
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
      if (!Feed.isRequestPostValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      try{
        DB.getObjectId(data.groupId);
      } catch(err){
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      data.message = data.message.toString().substring(0, 250);
      const insertResult = await DBHelper.getCollection(config.postCollection).insertOne({
        ownerId: DB.getObjectId(decodedAuth.data.id),
        groupId: DB.getObjectId(data.groupId),
        timestamp: new Date().valueOf(),
        message: data.message,
        comments: [],
        hearts: [],
        likes: []
      });
      log.debug(insertResult);
      if (!insertResult.insertedId) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Creating a Post Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.get('/view-post', async (req, res, next) => {
    const result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
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
      const findResult = await DBHelper.getCollection(config.postCollection).find({
        ownerId: DB.getObjectId(decodedAuth.data.id)
      }).toArray();
      log.debug(result);
      result.status = 200;
      result.error = null;
      result.message = 'Getting Post Successful';
      result.data = [];
      findResult.forEach((post)=>{
        const isLiked = post.likes.some(element => {
          if (element.toString() == decodedAuth.data.id.toString())
            return 1;
          return 0;
        });
        const isHearted = post.hearts.some(element => {
          if (element.toString() == decodedAuth.data.id.toString())
            return 1;
          return 0;
        });
        result.data.push({
          id: post._id.toString(),
          ownerId: post.ownerId.toString(),
          groupId: post.groupId.toString(),
          message: post.message,
          timestamp: post.timestamp,
          comments: post.comments.length,
          hearts: post.hearts.length,
          likes: post.likes.length,
          hearted: isHearted?1:0,
          liked: isLiked?1:0
        });
      });
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/list-post', async (req, res, next) => {
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
      if (!Feed.isRequestGroupPostValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      let skip = 0;
      if(data.skip)
        skip = parseInt(skip);
      const findResult = await DBHelper.getCollection(config.postCollection).find({
        groupId: DB.getObjectId(data.groupId)
      }).sort({timestamp: -1}).skip(skip).limit(20).toArray();
      log.debug(result);
      result.status = 200;
      result.error = null;
      result.message = 'Getting Group Post Successful';
      result.data = [];
      findResult.forEach((post)=>{
        const isLiked = post.likes.some(element => {
          if (element.toString() == decodedAuth.data.id.toString())
            return 1;
          return 0;
        });
        const isHearted = post.hearts.some(element => {
          if (element.toString() == decodedAuth.data.id.toString())
            return 1;
          return 0;
        });
        result.data.push({
          id: post._id.toString(),
          ownerId: post.ownerId.toString(),
          groupId: post.groupId.toString(),
          message: post.message,
          timestamp: post.timestamp,
          comments: post.comments.length,
          hearts: post.hearts.length,
          likes: post.likes.length,
          hearted: isHearted?1:0,
          liked: isLiked?1:0
        });
      });
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/heart', async (req, res, next) => {
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
      if (!Feed.isRequestReactValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.postCollection).updateOne({
        _id: DB.getObjectId(data.postId)
      },{
        $addToSet: {
          hearts: DB.getObjectId(decodedAuth.data.id)
        }
      });
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Heart a Post Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/like', async (req, res, next) => {
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
      if (!Feed.isRequestReactValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.postCollection).updateOne({
        _id: DB.getObjectId(data.postId)
      },{
        $addToSet: {
          likes: DB.getObjectId(decodedAuth.data.id)
        }
      });
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Liking a Post Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/unheart', async (req, res, next) => {
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
      if (!Feed.isRequestReactValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.postCollection).updateOne({
        _id: DB.getObjectId(data.postId)
      },{
        $pull: {
          hearts: DB.getObjectId(decodedAuth.data.id)
        }
      });
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Removing Heart on a Post Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/unlike', async (req, res, next) => {
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
      if (!Feed.isRequestReactValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.postCollection).updateOne({
        _id: DB.getObjectId(data.postId)
      },{
        $pull: {
          likes: DB.getObjectId(decodedAuth.data.id)
        }
      });
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Removing Like on a Post Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/comment', async (req, res, next) => {
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
      if (!Feed.isRequestCommentValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      const updatedResult = await DBHelper.getCollection(config.postCollection).updateOne({
        _id: DB.getObjectId(data.postId)
      },{
        $addToSet: {
          comments: { message: data.message.toString().substring(0, 150), ownerId: DB.getObjectId(decodedAuth.data.id), timestamp: new Date().valueOf() }
        }
      });
      log.debug(updatedResult);
      if (!updatedResult.modifiedCount) {
        result.status = 500;
        result.error = 'Internal Server Error';
        result.message = 'Something is wrong';
        throw result;
      } else {
        result.status = 200;
        result.error = null;
        result.message = 'Commenting a Post Successful';
        result.data = null;
      }
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/list-comment', async (req, res, next) => {
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
      if (!Feed.isRequestListCommentValid(data)) {
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Invalid Data';
        throw result;
      }
      // TODO SKip
      // let skip = 0;
      // if(data.skip)
      //   skip = parseInt(skip);
      const isExisting = await DBHelper.getCollection(config.postCollection).findOne({
        _id: DB.getObjectId(data.postId)
      });
      log.debug(isExisting);
      if(!isExisting){
        result.status = 400;
        result.error = 'Bad Request';
        result.message = 'Post is not existing';
        throw result;
      }
      //let newComments = isExisting.comments.slice(1, isExisting.comments.length)
      let newComments = isExisting.comments;
      result.status = 200;
      result.error = null;
      result.message = 'Getting Post Comments Successful';
      result.data = [];
      newComments.forEach((comment)=>{
        result.data.push({
          ownerId: comment.ownerId.toString(),
          message: comment.message,
          timestamp: comment.timestamp,
        });
      });
      return res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });

  service.post('/chart', async (req, res, next) => {
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
      let start = new Date();
      start.setHours(0,0,0,0);
      let end = new Date();
      end.setHours(23,59,59,999);
      let objectIDs = [];
      data.ids.forEach((id)=>{
        objectIDs.push(DB.getObjectId(id));
      });
      const stat1 = await DBHelper.getCollection(config.statCollection).count({
        ownerId: {$in: objectIDs},
        timestamp: {$gte: start.valueOf(), $lt: end.valueOf()},
        stat: "1"
      });
      const stat2 = await DBHelper.getCollection(config.statCollection).count({
        ownerId: {$in: objectIDs},
        timestamp: {$gte: start.valueOf(), $lt: end.valueOf()},
        stat: "2"
      });
      const stat3 = await DBHelper.getCollection(config.statCollection).count({
        ownerId: {$in: objectIDs},
        timestamp: {$gte: start.valueOf(), $lt: end.valueOf()},
        stat: "3"
      });
      const stat4 = await DBHelper.getCollection(config.statCollection).count({
        ownerId: {$in: objectIDs},
        timestamp: {$gte: start.valueOf(), $lt: end.valueOf()},
        stat: "4"
      });
      const stat5 = await DBHelper.getCollection(config.statCollection).count({
        ownerId: {$in: objectIDs},
        timestamp: {$gte: start.valueOf(), $lt: end.valueOf()},
        stat: "5"
      });
      let total = stat1 + stat2 + stat3 + stat4 + stat5;
      log.debug(result);
      result.status = 200;
      result.error = null;
      result.message = 'Getting Chart Successful';
      result.data = { 
        "1": ((stat1/total)*100),
        "2": ((stat2/total)*100), 
        "3": ((stat3/total)*100), 
        "4": ((stat4/total)*100),
         "5": ((stat5/total)*100) };
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
