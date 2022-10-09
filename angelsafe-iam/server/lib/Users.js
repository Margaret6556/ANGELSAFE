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
    return TypeCheck('{mobileNumber: String, ip: String}', data);
  }

  static isRequestEmailValid(data) {
    return TypeCheck('{email: String, password: String, ip: String}', data);
  }

  static isRequestEmailLoginValid(data) {
    return TypeCheck('{mfa: String, email: String, password: String, ip: String}', data);
  }

  // TODO Biometric Login
  static isRequestFingerprintLoginValid(data) {
    return TypeCheck('{mfa: String, fingerprint: String, ip: String}', data);
  }

  // TODO Social Media Login
  static isRequestSocialLoginValid(data) {
    return TypeCheck('{mfa: String, socialId: String, socialAccount: String, ip: String}', data);
  }

  static isRequestOTPValid(data) {
    return TypeCheck('{mfa: String, mobileNumber: String, otp: String, ip: String}', data);
  }

  static isRequestTokenValid(data) {
    return TypeCheck('{ip: String}', data);
  }

  static isRequestCodeValid(data){
    return TypeCheck('{code: String}', data);
  }

  static isRequestAuthValid(auth, mfa){
      if(auth && auth.length > 6){
        auth = Buffer.from(auth.slice(6), 'base64').toString();
        switch(mfa){
          case this.MFA.mobileNumber:
            return auth.length > 0;
          case this.MFA.email:
            const authSplit = auth.split(':');
            if(authSplit.length > 1)
              return (authSplit[0].length > 0 && authSplit[1].length > 0);
            else
              return false;
          case this.MFA.fingerprint:
            return false;
          case this.MFA.social:
            return false;
          default:
            return false;
        }
      }
  }

  static getRequestAuth(auth, mfa){
    if(auth && auth.length > 6){
      auth = Buffer.from(auth.slice(6), 'base64').toString();
      switch(mfa){
        case this.MFA.mobileNumber:
          return auth;
        case this.MFA.email:
          const authSplit = auth.split(':');
          return authSplit;
        case this.MFA.fingerprint:
          return null;
        case this.MFA.social:
          return null;
        default:
          return null;
      }
    }
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

  static isEmailValid(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  static validatePassword(hash, password){
    return Bcrypt.compareSync(password, hash);
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

  static encryptPassword(password, saltRounds = 10){
    const salt = Bcrypt.genSaltSync(saltRounds);
    return Bcrypt.hashSync(password, salt);
  }

  getList() {
    return this.users;
  }
}

module.exports = UsersService;