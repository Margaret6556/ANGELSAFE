import { _API } from "@/shared/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./actions";

type UserType = {
  username?: string;
  email?: string;
  mobile?: string;
  token?: string;
} | null;

export const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: null as UserType,
  error: "",
  redirectToGroup: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setRedirectToGroup: (state) => {
      state.redirectToGroup = true;
      if (!state.isLoggedIn) {
        state.isLoggedIn = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        console.log("in logout: success");
      })
      .addCase(logout.rejected, () => {
        console.log("in logout: fail");
      });
  },
});

export default auth.reducer;
export const { setUser, setLoggedIn, setRedirectToGroup } = auth.actions;
