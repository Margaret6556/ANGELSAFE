import { Auth } from "@/shared/config";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";

export default class SessionManager {
  static async getToken() {
    return await getItemAsync(Auth.KEY);
  }

  static async setToken(val: string) {
    return await setItemAsync(Auth.KEY, val);
  }

  static async deleteToken() {
    return await deleteItemAsync(Auth.KEY);
  }

  static async setHeader() {
    return {
      Authorization: `Bearer ${await SessionManager.getToken()}`,
    };
  }
}
