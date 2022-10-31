import base64 from "react-native-base64";
import { apiSlice } from ".";
import { _API } from "../config";
import type { BackendResponse } from "../types";

export type StatsType = {
  stat: string;
  experience: string[];
};

const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viewStat: builder.query<BackendResponse<StatsType & { id: string }>, void>({
      query: () => _API.STAT.VIEW,
      /**
       * nothing to invalidate here
       */
    }),
    createStat: builder.mutation<BackendResponse<{}>, StatsType>({
      query: (body) => ({
        url: _API.STAT.CREATE,
        body,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateStatMutation, useViewStatQuery } = statsApiSlice;
