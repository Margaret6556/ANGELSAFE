import axios from "axios";
import { _API } from "@/shared/config";

export default async function resetOTP(mobile: string) {
  try {
    const {
      data: {
        data: { mobileNumber },
        status,
      },
    } = await axios.post<{
      status: number;
      data: {
        mobileNumber: string;
      };
    }>(_API.AUTH.OTP, {
      mobileNumber: mobile,
    });

    console.log({ status });

    if (status === 200) {
      return mobileNumber;
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    }
  }

  return false;
}
