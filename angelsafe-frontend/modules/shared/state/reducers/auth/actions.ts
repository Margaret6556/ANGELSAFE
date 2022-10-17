import { _API } from "@/shared/config";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import base64 from "react-native-base64";
import { logout as _logout } from "@/shared/utils/auth";

export const register = createAsyncThunk(
  "auth/register",
  async (mobile: string) => {
    const {
      data: { data },
    } = await axios.post<{ data: { mobileNumber: string } }>(
      _API.AUTH.REGISTER,
      {
        mobile,
      }
    );

    return data.mobileNumber;
  }
);

export const login = createAsyncThunk(
  "auth/loginMobile",
  async ({ mobile, otp = "123456" }: { mobile: string; otp?: string }) => {
    const body = {
      mfa: "1",
      otp,
    };
    const authHeader = "Basic " + base64.encode(mobile);

    const {
      data: { data },
    } = await axios.post<{ data: { mobileNumber: string }; status: number }>(
      _API.AUTH.LOGIN,
      body,
      {
        headers: { Authorization: authHeader },
      }
    );
    console.log({ data });

    return data.mobileNumber;
  }
);

export const loginEmail = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch(_API.TEST);
    const data = await response.json();
    console.log({ data });
    return username;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const data = await _logout();

  return data;
});
