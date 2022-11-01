const TypeCheck = require('type-check').typeCheck;

class FeedService {
  constructor() {
  }

  static isRequestValid(data) {
    return TypeCheck('{ stat: String, experience: Array, ip: String}', data);
  }

  static isRequestPostValid(data) {
    return TypeCheck('{ message: String, groupId: String, ip: String}', data);
  }

  static isRequestGroupPostValid(data) {
    return TypeCheck('{ skip: Maybe String, groupId: String, ip: String}', data);
  }

  static isRequestReactValid(data) {
    return TypeCheck('{ postId: String , ip: String}', data);
  }

  static isRequestCommentValid(data) {
    return TypeCheck('{ postId: String , message: String, ip: String}', data);
  }

  static isRequestListCommentValid(data) {
    return TypeCheck('{ postId: String , skip: Maybe String, ip: String}', data);
  }

}

module.exports = FeedService;