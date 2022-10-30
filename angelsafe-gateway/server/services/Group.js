const axios = require('axios');
// const url = require('url');
// const crypto = require('crypto');
// const createError = require('http-errors');
const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class GroupService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
    this.cache = {};
  }

  async register(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
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
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
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
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/update-pic`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async getInfo(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/info`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async join(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/join`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async unjoin(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/unjoin`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async ban(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/ban`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async getMembers(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/members`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      params: req.query
    });
  }

  async getAllMembers(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/all-members`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      params: req.query
    });
  }

  // TODO add skip(offset).limit(limit)
  async getGroups(req) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'get',
      url: `http://${ip}:${port}/list`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      params: req.query
    });
  }

  async verify(req, data) {
    const { ip, port } = await this.getService('angelsafe-group');
    return GroupService.callService({
      method: 'post',
      url: `http://${ip}:${port}/verify`,
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

module.exports = GroupService;