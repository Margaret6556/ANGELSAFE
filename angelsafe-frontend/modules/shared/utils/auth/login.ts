import base64 from "react-native-base64";
import axios from "axios";
import { Auth, _API } from "@/shared/config";
import * as SecureStore from "expo-secure-store";

type LoginArgs = {
  mobile: string;
  otp: string;
};

export default async function login({ mobile, otp }: LoginArgs) {
  const body = {
    mfa: "1",
    otp,
  };
  try {
    const authHeader = "Basic " + base64.encode(mobile);
    console.log({ authHeader });
    const {
      data: { data, status },
    } = await axios.post<{ data: { token: string }; status: number }>(
      _API.AUTH.LOGIN,
      body,
      {
        headers: { Authorization: authHeader },
      }
    );

    console.log({ token: data.token });

    SecureStore.setItemAsync(Auth.KEY, data.token);
    return { data, status };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(1);
      throw e.response?.data.message;
    }
    if (e instanceof Error) {
      console.log(2);
      throw e.message;
    }
    console.info({ e });
  }

  return false;
}
