import base64 from "react-native-base64";
import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse } from "../types";

export type ProfileRegisterType = {
  username: string;
  year: string;
  country: string;
  gender: string;
};

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerProfile: builder.mutation<BackendResponse<{}>, ProfileRegisterType>(
      {
        query: (body) => ({
          url: _API.PROFILE.REGISTER,
          body,
          method: "POST",
        }),
        invalidatesTags: ["PROFILE"],
      }
    ),
    getProfile: builder.query<
      BackendResponse<ProfileRegisterType & { profilePic: string }>,
      string
    >({
      query: (token) => ({
        url: _API.PROFILE.INFO,
        headers: {
          Authorization: token,
        },
      }),

      providesTags: ["PROFILE"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterProfileMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = profileApiSlice;
