const PhoneNumber = require('awesome-phonenumber');

class MobileNumber {
  static validateNumber(number, regionCode) {
    const result = new PhoneNumber(number, regionCode);
    return result.isValid();
  }

  static validateNumberFormat(number, regionCode) {
    const result = new PhoneNumber(number, regionCode);
    return result.isValid() ? result.getNumber('e164') : false;
  }
}
module.exports = MobileNumber;