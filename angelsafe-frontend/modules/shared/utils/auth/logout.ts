import { useAppDispatch } from "@/shared/hooks";
import { deleteItemAsync } from "expo-secure-store";
import { logout as _logout } from "@/shared/state/reducers/auth/actions";
import { Auth, _API } from "@/shared/config";

const logout = async () => {
  try {
    const response = await fetch(_API.TEST);
    const data = await response.json();
    deleteItemAsync(Auth.KEY);

    return data;
  } catch (e) {
    console.log("From secure store: ", e);
  }

  return null;
};

export default logout;
