module.exports = {
    development: {
      serviceRegistryUrl: 'http://localhost:3000',
      serviceVersionIdentifier: '0.1.x',
      serverPort: 3001,
      blockedIPs: [],
    },
    production: {
      serviceRegistryUrl: 'http://localhost:3000',
      serviceVersionIdentifier: '0.1.x',
      serverPort: 4001,
      blockedIPs: [],
    },
  };