import base64 from "react-native-base64";
import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse } from "../types";

type LoginArgs = {
  mobile: string;
  otp: string;
};

type MobileArg = {
  mobileNumber: string;
};

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BackendResponse<{ token: string }>, LoginArgs>({
      query: ({ mobile, otp }) => ({
        url: _API.AUTH.LOGIN,
        body: {
          mfa: "1",
          otp,
        },
        method: "POST",
        headers: {
          Authorization: `Basic ${base64.encode(mobile)}`,
        },
      }),
      invalidatesTags: ["AUTH"],
    }),
    register: builder.mutation<BackendResponse<MobileArg>, MobileArg>({
      query: (body) => ({
        url: _API.AUTH.REGISTER,
        body,
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),
    resendOtp: builder.mutation<BackendResponse<MobileArg>, MobileArg>({
      query: (body) => ({
        url: _API.AUTH.OTP,
        body,
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),
    logout: builder.query<BackendResponse<any>, void>({
      query: () => _API.TEST,
      providesTags: ["AUTH"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResendOtpMutation,
  useLogoutQuery,
  useLazyLogoutQuery,
} = authApiSlice;
