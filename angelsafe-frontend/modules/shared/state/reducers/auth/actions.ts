import { Auth, _API } from "@/shared/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteItemAsync } from "expo-secure-store";

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await deleteItemAsync(Auth.KEY);
  } catch (e) {
    console.log("From secure store: ", e);
  }

  return null;
});
