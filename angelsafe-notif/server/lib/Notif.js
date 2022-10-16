const TypeCheck = require('type-check').typeCheck;

class NotifService {
  constructor() {
  }

  static isRequestValid(data) {
    return TypeCheck('{ id: String, message: String }', data);
  }

}

module.exports = NotifService;