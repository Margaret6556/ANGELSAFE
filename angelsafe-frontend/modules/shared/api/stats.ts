import base64 from "react-native-base64";
import { apiSlice } from ".";
import { _API } from "../config";
import type { BackendResponse } from "../types";

export type StatsType = {
  stat: string;
  experience: string[];
};

export type StatChartType = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
};

const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viewStat: builder.query<BackendResponse<StatsType & { id: string }>, void>({
      query: () => _API.STAT.VIEW,
      providesTags: ["STAT"],
    }),
    getGroupChart: builder.query<
      BackendResponse<StatChartType>,
      { groupId: string }
    >({
      query: (body) => ({
        url: _API.STAT.CHART,
        method: "POST",
        body,
      }),
      providesTags: ["STAT"],
    }),
    createStat: builder.mutation<BackendResponse<{}>, StatsType>({
      query: (body) => ({
        url: _API.STAT.CREATE,
        body,
        method: "POST",
      }),
      invalidatesTags: ["STAT"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateStatMutation,
  useViewStatQuery,
  useGetGroupChartQuery,
} = statsApiSlice;
