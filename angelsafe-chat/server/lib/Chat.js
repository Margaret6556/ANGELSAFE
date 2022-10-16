const TypeCheck = require('type-check').typeCheck;

class ChatService {
  constructor() {
  }

  static isRequestValid(data) {
    return TypeCheck('{ id: String, message: String, ip: String }', data);
  }

}

module.exports = ChatService;