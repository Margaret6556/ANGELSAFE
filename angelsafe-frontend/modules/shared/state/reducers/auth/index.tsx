import { _API } from "@/shared/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register } from "./actions";

type UserType = {
  username?: string;
  email?: string;
  mobile?: string;
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
    setRedirectToGroup: (state, action: PayloadAction<boolean>) => {
      state.redirectToGroup = action.payload;
      if (!state.isLoggedIn) {
        state.isLoggedIn = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER

      .addCase(register.pending, (state, action) => {
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log({ a: action.payload });
        // state.isLoading = false;
        // state.isLoggedIn = true;
        // state.user = { username: action.payload, email: "hosnibona@gmail.com" };
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Registration rejected", action.error.message!);
        state.error = action.error.message!!;
      })

      // LOGIN

      .addCase(login.pending, (state, action) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        console.log(action.payload);
        state.user = { username: action.payload, email: "hosnibona@gmail.com" };
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isLoading = false;
        state.isLoggedIn = false;
        console.log("Login rejected:", action.error);
      })

      // LOGOUT

      .addCase(logout.pending, (state, action) => {
        state.error = "";
        state.isLoading = true;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isLoading = false;
        // state.isLoggedIn = false;
        // state.user = null;
      });
  },
});

export default auth.reducer;
export const { setUser, setLoggedIn, setRedirectToGroup } = auth.actions;
