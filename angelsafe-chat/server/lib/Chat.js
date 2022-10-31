const TypeCheck = require('type-check').typeCheck;

class ChatService {
  constructor() {
  }

  static isRequestValid(data) {
    return TypeCheck('{ receiverId: String, message: String, ip: String }', data);
  }

  static isRequestViewValid(data) {
    return TypeCheck('{ receiverId: String, skip: Maybe String, ip: String }', data);
  }
}

module.exports = ChatService;
