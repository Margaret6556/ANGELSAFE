const bunyan = require('bunyan');
// Load package.json
const pjs = require('../package.json');

// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

// Configuration options for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    countryCode: 'IN',
    OTPMax: 6,
    usersCollection: 'users',
    dbHost: 'localhost',
    dbPort: '27017',
    dbName: 'angelsafe',
    iamHash: 'angelsafev1',
    emailHost: '',
    emailPort: '',
    emailUser: '',
    emailPass: '',
    emailSecure: false,
    accountSid: '',
    serviceId: '',
    authToken: '',
    log: () => getLogger(name, version, 'debug'),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    countryCode: 'IN',
    OTPMax: 6,
    usersCollection: 'users',
    dbHost: 'http://localhost',
    dbPort: '27017',
    dbName: 'angelsafe',
    iamHash: 'angelsafev1',
    emailHost: '',
    emailPort: '',
    emailUser: '',
    emailPass: '',
    emailSecure: true,
    log: () => getLogger(name, version, 'info'),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    countryCode: 'IN',
    OTPMax: 6,
    usersCollection: 'users',
    dbHost: 'http://localhost',
    dbPort: '27017',
    dbName: 'angelsafe',
    iamHash: 'angelsafev1',
    emailHost: '',
    emailPort: '',
    emailUser: '',
    emailPass: '',
    emailSecure: false,
    log: () => getLogger(name, version, 'fatal'),
  },
};