const {phone} = require('phone');

class MobileNumber {
  static validateNumber(number) {
    const result = phone(number);
    return result.isValid;
  }

  static validateNumberFormat(number, regionCode) {
    const result = phone(number);
    return result.isValid ? result.phoneNumber : false;
  }

}
module.exports = MobileNumber;