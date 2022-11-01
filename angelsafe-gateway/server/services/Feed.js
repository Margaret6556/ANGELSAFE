const axios = require('axios');
// const url = require('url');
// const crypto = require('crypto');
// const createError = require('http-errors');
const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

class FeedService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
    this.cache = {};
  }

  async createStat(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/create`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async getStat(req) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'get',
      url: `http://${ip}:${port}/view`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async getChart(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/chart`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async getWins(req) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'get',
      url: `http://${ip}:${port}/wins`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async createPost(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/create-post`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async getPost(req) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'get',
      url: `http://${ip}:${port}/view-post`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async listPost(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/list-post`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async heart(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/heart`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async unheart(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/unheart`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async like(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/like`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async unlike(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/unlike`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async comment(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/comment`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
    });
  }

  async listComment(req, data) {
    const { ip, port } = await this.getService('angelsafe-feed');
    return FeedService.callService({
      method: 'post',
      url: `http://${ip}:${port}/list-comment`,
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

module.exports = FeedService;