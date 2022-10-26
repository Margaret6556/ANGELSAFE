export const SERVER_URL = "http://143.198.58.171/api";

export const _API = {
  AUTH: {
    LOGIN: "/auth/login",
    OTP: "/auth/otp",
    REGISTER: "/auth/register",
    REGISTER_EMAIL: "/auth/register-email",
    REFRESH: "/refresh-token",
  },
  PROFILE: {
    REGISTER: "/profile/register",
    UPDATE: "/profile/update",
    UPDATE_PIC: "/profile/update-pic",
    INFO: "/profile/info", // GET
  },
  GROUP: {
    UPDATE: "/group/update",
    REGISTER: "/group/register",
    UPDATE_PIC: "/group/update-pic",
    INFO: "/group/info",
    JOIN: "/group/join",
    UNJOIN: "/group/unjoin",
    MEMBERS: "/group/members",
    LIST: "/group/list", // GET
    BAN: "/group/ban",
  },
  CHAT: {
    LIST: "/api/chat/list",
  },
  TEST: "/info/version",
};

export enum Auth {
  KEY = "auth_token",
}
