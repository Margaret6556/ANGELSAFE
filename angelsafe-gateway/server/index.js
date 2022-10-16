const express = require('express');
const http = require('http');
const cors = require('cors');
const ipFilter = require('express-ipfilter').IpFilter;
const ipDeniedError = require('express-ipfilter/lib/deniedError');
const rateLimit = require('express-rate-limit');
const createError = require('http-errors');
const socketIO = require('socket.io');
const configs = require('./config');
const IAM = require('./services/IAM');
const Profile = require('./services/Profile');
const Group = require('./services/Group');
const Notif = require('./services/Notif');

const app = express();
const config = configs[app.get('env')];
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(ipFilter(config.blockedIPs, { mode: 'deny' }));
app.use((err, req, res, next) => {
  if (err && err instanceof ipDeniedError) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    next(createError(401, 'Unauthorized'));
  } else if (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    next(createError(err.status || 500, 'InternalServerError'));
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }
});
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(limiter);

async function processData(req, res) {
  let result = {
    status: 500,
    error: 'Internal Server Error',
    message: 'Something went wrong.',
  };
  try {
    result = {
      status: 400,
      error: 'Invalid API',
      message: 'Invalid API',
    };
    // eslint-disable-next-line no-unused-vars
    const data = {
      ...req.query,
      ...req.body,
    };
    data.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const IAMService = new IAM(config);
    const ProfileService = new Profile(config);
    const GroupService = new Group(config);
    const NotifService = new Notif(config);
    switch (req.params.sub) {
      case 'info': 
        switch (req.params.ext) {
          case 'version':
            switch (req.method) {
              case 'GET':
                result.status = 200;
                result.error = null;
                result.message = 'Getting Information Successful';
                result.data = { version: "v0.1.0" }; // TODO create version on config and create entry on API docu
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          default:
            res.status(result.status).json(result);
        }
      break;
      case 'auth':
        switch (req.params.ext) {
          case 'register':
            switch (req.method) {
              case 'POST':
                result = await IAMService.register(data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          case 'register-email':
            switch (req.method) {
              case 'POST':
                result = await IAMService.registerEmail(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          case 'change-password':
            switch (req.method) {
              case 'POST':
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          case 'login':
            switch (req.method) {
              case 'POST':
                result = await IAMService.login(req,data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          case 'otp':
            switch (req.method) {
              case 'POST':
                result = await IAMService.otp(data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          case 'refresh-token':
            switch (req.method) {
              case 'POST':
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          case 'logout':
            switch (req.method) {
              case 'POST':
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          default:
            res.status(result.status).json(result);
        }
      break;
      case 'profile':
        switch (req.params.ext) {
          case 'register':
            switch (req.method) {
              case 'POST':
                result = await ProfileService.register(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'update':
            switch (req.method) {
              case 'POST':
                result = await ProfileService.update(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'update-pic':
            switch (req.method) {
              case 'POST':
                result = await ProfileService.updatePic(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'info':
            switch (req.method) {
              case 'GET':
                result = await ProfileService.getInfo(req);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          default:
            res.status(result.status).json(result);
        }
      break;
      case 'group':
        switch (req.params.ext) {
          case 'register':
            switch (req.method) {
              case 'POST':
                result = await GroupService.register(req, data);
                if(result.status == 200)
                  NotifService.create({
                    id: result.data.id,
                    message: result.data.message
                  });
                result.data = {};
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'update':
            switch (req.method) {
              case 'POST':
                result = await GroupService.update(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'update-pic':
            switch (req.method) {
              case 'POST':
                result = await GroupService.updatePic(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'info':
            switch (req.method) {
              case 'POST':
                result = await GroupService.getInfo(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'join':
            switch (req.method) {
              case 'POST':
                result = await GroupService.join(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'unjoin':
            switch (req.method) {
              case 'POST':
                result = await GroupService.unjoin(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'ban':
            switch (req.method) {
              case 'POST':
                result = await GroupService.ban(req, data);
                if(result.status == 200)
                  NotifService.create({
                    id: result.data.id,
                    message: result.data.message
                  });
                result.data = {};
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'members':
            switch (req.method) {
              case 'POST':
                result = await GroupService.getMembers(req, data);
                result = await ProfileService.getProfiles(req, { ids: result.data, ip: data.ip});
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          case 'list':
            switch (req.method) {
              case 'GET':
                result = await GroupService.getGroups(req, data);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
          break;
          default:
            res.status(result.status).json(result);
        }
      break;
      case 'notif':
        switch (req.params.ext) {
          case 'list':
            switch (req.method) {
              case 'GET':
                result = await NotifService.getNotif(req);
                res.status(result.status).json(result);
                break;
              default:
                res.status(result.status).json(result);
            }
            break;
          default:
            res.status(result.status).json(result);
        }
      break;
      default:
        res.status(result.status).json(result);
    }
  } catch (err) {
    res.status(err.status).json(err);
  }
}

app.get('/api/:sub/:ext', async (req, res) => {
  processData(req, res);
});
app.get('/api/:sub', async (req, res) => {
  processData(req, res);
});
app.get('/api', async (req, res) => {
  processData(req, res);
});
app.post('/api/:sub/:ext', async (req, res) => {
  processData(req, res);
});
app.post('/api/:sub', async (req, res) => {
  processData(req, res);
});
app.post('/api', async (req, res) => {
  processData(req, res);
});
app.get('/docs', (req, res) => {
  res.sendFile('./docs.html', { root: 'docs' });
});
app.get('/verify-email/:code', async (req, res) => {
  const IAMService = new IAM(config);
  let result = {
    status: 500,
    error: 'Internal Server Error',
    message: 'Something went wrong.',
  };
  try{
    result = await IAMService.verifyEmail(req.params);
    if(result.status == 200)
      res.sendFile('./email-verified.html', { root: 'public' });
    else
      res.sendFile('./email-not-verified.html', { root: 'public' });
  } catch (err) {
    res.sendFile('./email-not-verified.html', { root: 'public' });
  }
});
app.get('*', (req, res) => {
  res.sendFile('./index.html', { root: 'public' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

const server = http.createServer(app);
const io = socketIO(server);
io.use(async (socket, next)=>{
  try{
    if (socket.handshake.headers && socket.handshake.headers.token){
      const IAMService = new IAM(config);
      let result = await IAMService.verifyToken({ token: socket.handshake.headers.token});
      if(!result || result.status != 200)
        return next(new Error('Authentication error'));
      socket.userId = result.data.id;
      next();
    } else {
      next(new Error('Internal Server Error'));
    } 
  } catch ( err ){
    next(new Error('Internal Server Error'));
  }
});
io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(config.serverPort);
module.export = app;