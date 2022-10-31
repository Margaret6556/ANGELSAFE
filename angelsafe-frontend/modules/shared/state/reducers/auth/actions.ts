import { Auth, _API } from "@/shared/config";
import logger from "@/shared/utils/logger";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteItemAsync } from "expo-secure-store";

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await deleteItemAsync(Auth.KEY);
  } catch (e) {
    logger("auth", e as any);
  }

  return null;
});
