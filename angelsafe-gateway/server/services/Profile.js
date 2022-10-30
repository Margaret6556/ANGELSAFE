const axios = require('axios');
// const url = require('url');
// const crypto = require('crypto');
// const createError = require('http-errors');
const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class ProfileService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
    this.cache = {};
  }

  async register(req, data) {
    const { ip, port } = await this.getService('angelsafe-profile');
    return ProfileService.callService({
      method: 'post',
      url: `http://${ip}:${port}/register`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async update(req, data) {
    const { ip, port } = await this.getService('angelsafe-profile');
    return ProfileService.callService({
      method: 'post',
      url: `http://${ip}:${port}/update`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async updatePic(req, data) {
    const { ip, port } = await this.getService('angelsafe-profile');
    return ProfileService.callService({
      method: 'post',
      url: `http://${ip}:${port}/update-pic`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async getInfo(req) {
    const { ip, port } = await this.getService('angelsafe-profile');
    return ProfileService.callService({
      method: 'get',
      url: `http://${ip}:${port}/info`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }
  
  async getProfiles(req, data) {
    const { ip, port } = await this.getService('angelsafe-profile');
    return ProfileService.callService({
      method: 'post',
      url: `http://${ip}:${port}/list`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
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

module.exports = ProfileService;