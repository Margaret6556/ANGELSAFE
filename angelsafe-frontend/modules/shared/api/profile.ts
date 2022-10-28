import base64 from "react-native-base64";
import { apiSlice } from ".";
import { _API } from "../config";
import type { BackendResponse, UserType } from "../types";

export type ProfileRegisterType = Pick<
  UserType,
  "username" | "year" | "country" | "gender"
>;

type UpdateProfileType = Partial<
  Omit<UserType, "id" | "token" | "username" | "photo">
>;

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
    getProfile: builder.query<BackendResponse<UserType>, string | undefined>({
      query: (token) => ({
        url: _API.PROFILE.INFO,
        headers: { Authorization: token },
      }),

      providesTags: ["PROFILE"],
    }),
    updateProfile: builder.mutation<BackendResponse<{}>, UpdateProfileType>({
      query: (body) => ({
        url: _API.PROFILE.UPDATE,
        body,
        method: "POST",
      }),
      invalidatesTags: ["PROFILE"],
    }),
    updateProfilePicture: builder.mutation<
      BackendResponse<{}>,
      Pick<UserType, "profilePic">
    >({
      query: (body) => ({
        url: _API.PROFILE.UPDATE_PIC,
        body,
        method: "POST",
      }),
      invalidatesTags: ["PROFILE"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterProfileMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} = profileApiSlice;
