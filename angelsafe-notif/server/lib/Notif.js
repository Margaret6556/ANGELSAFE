const TypeCheck = require('type-check').typeCheck;

class NotifService {
  constructor() {
  }

  static isRequestValid(data) {
    return TypeCheck('{ id: String, message: String, profilePic: String, groupname: String, groupId: String }', data);
  }

}

module.exports = NotifService;