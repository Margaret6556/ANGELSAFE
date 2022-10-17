export const SERVER_URL = "http://143.198.58.171/api";

export const _API = {
  AUTH: {
    LOGIN: `${SERVER_URL}/auth/login`,
    OTP: `${SERVER_URL}/auth/otp`,
    REGISTER: `${SERVER_URL}/auth/register`,
    REGISTER_EMAIL: `${SERVER_URL}/auth/register-email`,
  },
  PROFILE: {
    REGISTER: `${SERVER_URL}/profile/register`,
    UPDATE: `${SERVER_URL}/profile/update`,
    UPDATE_PIC: `${SERVER_URL}/profile/update-pic`,
    INFO: `${SERVER_URL}/profile/info`, // GET
  },
  GROUP: {
    UPDATE: `${SERVER_URL}/group/update`,
    REGISTER: `${SERVER_URL}/group/register`,
    UPDATE_PIC: `${SERVER_URL}/group/update-pic`,
    INFO: `${SERVER_URL}/group/info`,
    JOIN: `${SERVER_URL}/group/join`,
    UNJOIN: `${SERVER_URL}/group/unjoin`,
    MEMBERS: `${SERVER_URL}/group/members`,
    LIST: `${SERVER_URL}/group/list`, // GET
    BAN: `${SERVER_URL}/group/ban`,
  },

  TEST: `${SERVER_URL}/info/version`,
};

export enum Auth {
  KEY = "auth_token",
}
