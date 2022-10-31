import { Auth, FIVE_MINUTES, SERVER_URL, _API } from "@/shared/config";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setItemAsync } from "expo-secure-store";
import { RootState } from "../state";
import { setLoggedIn, setUser } from "../state/reducers/auth";
import { logout } from "../state/reducers/auth/actions";
import { BackendErrorResponse, BackendResponse } from "../types";
import logger from "../utils/logger";

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.user?.token;
    if (token && endpoint !== "login") {
      logger("api", { endpoint });
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFn<
  string | FetchArgs,
  unknown,
  BackendResponse<BackendErrorResponse>,
  {}
>;

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const {
    auth: { lastLoggedIn, isLoggedIn },
  } = api.getState() as RootState;
  const currentTime = Date.now();
  const isExpired = currentTime - lastLoggedIn > FIVE_MINUTES;

  if (isLoggedIn && isExpired) {
    try {
      const {
        data: {
          data: { token },
          status,
        },
      } = (await baseQuery(_API.AUTH.REFRESH, api, extraOptions)) as {
        data: BackendResponse<{ token: string }>;
      };

      if (token && status === 200) {
        await setItemAsync(Auth.KEY, token);
        api.dispatch(setUser({ token }));
        api.dispatch(setLoggedIn(true));
        logger("api", `New token: ${token}`);
      } else if (status === 401) {
        logger("api", "Received status 401 - Unauthenticated");
        api.dispatch(logout());
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("api", err.data);
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status) {
    const err = result.error;
    const {
      request: { url },
    } = result.meta as any;
    logger("api", {
      message: err.data.message,
      status: result.error.status,
      url,
    });
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AUTH", "GROUPS", "PROFILE", "CHAT", "POST", "STAT"],
  endpoints: () => ({}),
});
