import { _API } from "@/shared/config";
import axios from "axios";

export default async function register(mobile: string) {
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
    }>(_API.AUTH.REGISTER, {
      mobileNumber: mobile,
    });

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
