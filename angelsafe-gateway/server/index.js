const express = require('express');
const cors = require('cors');
const ipFilter = require('express-ipfilter').IpFilter;
const ipDeniedError = require('express-ipfilter/lib/deniedError');
const rateLimit = require('express-rate-limit');
const createError = require('http-errors');
const configs = require('./config');
const IAM = require('./services/IAM');

const app = express();
const config = configs[app.get('env')];
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
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
    switch (req.params.sub) {
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
          case 'verify':
            switch (req.method) {
              case 'GET':
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
app.get('*', (req, res) => {
  res.sendFile('./index.html', { root: 'public' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

app.listen(config.serverPort);

module.export = app;