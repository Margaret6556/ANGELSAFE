import base64 from "react-native-base64";
import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse } from "../types";

type LoginArgs = {
  mobile?: string;
  otp?: string;
} & Partial<EmailArg>;

type MobileArg = {
  mobileNumber: string;
};

type EmailArg = {
  email: string;
  password: string;
};

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BackendResponse<{ token: string }>, LoginArgs>({
      query: ({ mobile, otp, password, email }) => {
        const headers = {
          Authorization: `Basic ${
            mobile && otp
              ? base64.encode(`${mobile}:`)
              : email && password
              ? base64.encode(`${email}:${password}`)
              : ""
          }`,
        };

        const body =
          mobile && otp
            ? {
                mfa: "1",
                otp,
              }
            : {
                mfa: "2",
              };

        return {
          url: _API.AUTH.LOGIN,
          body,
          method: "POST",
          headers,
        };
      },
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
    registerEmail: builder.mutation<
      BackendResponse<Pick<EmailArg, "email">>,
      EmailArg
    >({
      query: (body) => ({
        url: _API.AUTH.REGISTER_EMAIL,
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
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResendOtpMutation,
  useRegisterEmailMutation,
} = authApiSlice;
