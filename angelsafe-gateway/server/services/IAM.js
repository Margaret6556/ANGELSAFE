const axios = require('axios');
// const url = require('url');
// const crypto = require('crypto');
// const createError = require('http-errors');
const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class IAMService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
    this.cache = {};
  }

  async register(data) {
    const { ip, port } = await this.getService('angelsafe-iam');
    return IAMService.callService({
      method: 'post',
      url: `http://${ip}:${port}/register`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async otp(data) {
    const { ip, port } = await this.getService('angelsafe-iam');
    return IAMService.callService({
      method: 'post',
      url: `http://${ip}:${port}/otp`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async login(req, data) {
    const { ip, port } = await this.getService('angelsafe-iam');
    return IAMService.callService({
      method: 'post',
      url: `http://${ip}:${port}/login`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async refreshToken(data, req) {
    const { ip, port } = await this.getService('angelsafe-iam');
    return IAMService.callService({
      method: 'post',
      url: `http://${ip}:${port}/refresh-token`,
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization ? req.headers.authorization : '',
      },
    });
  }

  static async callService(requestOptions) {
    const result = await circuitBreaker.callService(requestOptions);
    return result;
  }

  async getService(servicename) {
    try {
      const response = await axios.get(`${this.serviceRegistryUrl}/find/${servicename}/${this.serviceVersionIdentifier}`);
      return response.data;
    } catch (err) {
      return {
        timestamp: 0,
        ip: '0.0.0.0',
        port: '0',
        name: 'no-service',
        version: '0',
      };
    }
  }
}

module.exports = IAMService;