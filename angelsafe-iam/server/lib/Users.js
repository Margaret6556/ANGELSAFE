const TypeCheck = require('type-check').typeCheck;

class UsersService {
  constructor() {
    this.users = ['johnny-test'];
  }

  static isRequestValid(data) {
    return TypeCheck('{mobileNumber: String, ip: String}', data);
  }

  static isRequestOTPValid(data) {
    return TypeCheck('{mobileNumber: String, otp: String, ip: String}', data);
  }

  static isRequestTokenValid(data) {
    return TypeCheck('{ip: String}', data);
  }

  static generateOTP(length) {
    return Math.floor(10 ** (length - 1) + Math.random() * (10 ** length - 10 ** (length - 1) - 1));
  }

  static generateUsername() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += UsersService.generateOTP(3);
    return text;
  }

  getList() {
    return this.users;
  }
}

module.exports = UsersService;