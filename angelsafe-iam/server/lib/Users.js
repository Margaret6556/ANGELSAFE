const TypeCheck = require('type-check').typeCheck;
const Bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.users = ['johnny-test'];
  }

  static get MFA(){
    return {
      'mobileNumber': 1,
      'email': 2,
      'social': 3,
      'fingerprint': 4
    };
  }

  static isRequestValid(data) {
    return TypeCheck('{mobileNumber: String, password: String, ip: String}', data);
  }

  static isRequestOTPValid(data) {
    return TypeCheck('{mobileNumber: String, otp: String, ip: String}', data);
  }

  static isRequestTokenValid(data) {
    return TypeCheck('{ip: String}', data);
  }

  static isPasswordValid(password){
    const strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    const mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    const enoughRegex = new RegExp("(?=.{8,}).*", "g");
    if (password.length == 0) {
      return false;
    } else if (false == enoughRegex.test(password)) {
      return false;
    } else if (strongRegex.test(password)) {
      return true;
    } else if (mediumRegex.test(password)) {
      return true;
    } else {
      return true;
    }
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

  static encryptPassword(password, salt){
    return Bcrypt.hashSync(password, salt);
  }

  getList() {
    return this.users;
  }
}

module.exports = UsersService;