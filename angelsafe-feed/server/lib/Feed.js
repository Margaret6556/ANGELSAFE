const TypeCheck = require('type-check').typeCheck;

class FeedService {
  constructor() {
  }

  static isRequestValid(data) {
    return TypeCheck('{ stat: String , ip: String}', data);
  }

  static isRequestPostValid(data) {
    return TypeCheck('{ message: String , ip: String}', data);
  }

  static isRequestReactValid(data) {
    return TypeCheck('{ postId: String , ip: String}', data);
  }

}

module.exports = FeedService;