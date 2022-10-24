import { SERVER_URL } from "@/shared/config";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../state";
import { BackendErrorResponse, BackendResponse } from "../types";

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token;
    if (token) {
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

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["AUTH", "GROUPS", "PROFILE", "CHAT"],
  endpoints: () => ({}),
});
