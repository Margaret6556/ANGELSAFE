const axios = require('axios');
// const url = require('url');
// const crypto = require('crypto');
// const createError = require('http-errors');
const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class ChatService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
    this.cache = {};
  }

  async view(req, data) {
    const { ip, port } = await this.getService('angelsafe-chat');
    return ChatService.callService({
      method: 'post',
      url: `http://${ip}:${port}/view`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async create(req, data) {
    const { ip, port } = await this.getService('angelsafe-chat');
    return ChatService.callService({
      method: 'post',
      url: `http://${ip}:${port}/create`,
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

module.exports = ChatService;