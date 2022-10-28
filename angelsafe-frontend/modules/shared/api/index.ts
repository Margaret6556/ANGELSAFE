import { SERVER_URL, _API } from "@/shared/config";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../state";
import { setLoggedIn } from "../state/reducers/auth";
import { BackendErrorResponse, BackendResponse } from "../types";

const FIVE_MINUTES = 1 * 60 * 1000;

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.user?.token;
    if (token && endpoint !== "login") {
      console.log("here", token);
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
      console.log("refresh hit");
      // const data = (await baseQuery(
      //   _API.AUTH.REFRESH,
      //   api,
      //   extraOptions
      // )) as BackendResponse<{ token: string }>;
      // console.log((data as any).error.data);
      // console.log(data);
      // api.dispatch(setLoggedIn(true));
    } catch (e) {
      console.log({ e });
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AUTH", "GROUPS", "PROFILE", "CHAT", "POST"],
  endpoints: () => ({}),
});
