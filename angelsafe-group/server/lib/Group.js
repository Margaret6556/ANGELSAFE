const TypeCheck = require('type-check').typeCheck;
const IsBase64 = require('is-base64');

class GroupService {
  constructor() {
  }

  static isRequestValid(data) {
    return TypeCheck('{groupname: String, description: String, ip: String}', data);
  }

  static isRequestUpdateValid(data) {
    return TypeCheck('{groupname: Maybe String, description: Maybe String, ip: String}', data);
  }

  static isRequestUpdatePicValid(data) {
    return TypeCheck('{ profilePic: String, ip: String}', data);
  }

  static isRequestJoinValid(data) {
    return TypeCheck('{groupId: String, ip: String}', data);
  }

  static isRequestBanValid(data) {
    return TypeCheck('{groupId: String, id: String, ip: String}', data);
  }

  

  static isGroupnameValid(data){
    return data.length > 6 && data.length < 14;
  }

  static isDescriptionValid(data){
    return data.length > 0;
  }

  static async isProfilePicValid(data){
    return IsBase64(data, { mime: true });
  }

}

module.exports = GroupService;