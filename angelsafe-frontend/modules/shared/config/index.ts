export const SERVER_URL = "http://143.198.58.171/api";

export const _API = {
  AUTH: {
    LOGIN: "/auth/login",
    OTP: "/auth/otp",
    REGISTER: "/auth/register",
    REGISTER_EMAIL: "/auth/register-email",
    REFRESH: "/auth/refresh-token",
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
  POST: {
    LIST: "/post/list",
    VIEW: "/post/view",
    CREATE: "/post/create",
    HEART: "/post/heart",
    LIKE: "/post/like",
    UNHEART: "/post/unheart",
    UNLIKE: "/post/unlike",
  },
  STAT: {
    CREATE: "/stat/create",
    VIEW: "/stat/view",
  },
  CHAT: {
    LIST: "/chat/list",
    CREATE: "/chat/create",
    VIEW: "/chat/view",
  },
  TEST: "/info/version",
};

export enum Auth {
  KEY = "auth_token",
}

export const ONE_DAY = 60 * 60 * 24 * 1000;
export const FIVE_MINUTES = 5 * 60 * 1000;
export const TEN_MINUTES = 10 * 60 * 1000;
