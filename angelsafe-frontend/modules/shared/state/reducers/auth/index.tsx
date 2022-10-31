import { _API } from "@/shared/config";
import { UserType } from "@/shared/types";
import logger from "@/shared/utils/logger";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./actions";

type PartialUserType = Partial<UserType> | null;

export const initialState = {
  isLoggedIn: false,
  isLoading: false,
  lastLoggedIn: 0,
  user: null as PartialUserType,
  redirectToGroup: false, // used only once after registration. If true navigates to group instead of home
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PartialUserType>) => {
      if (!action.payload) {
        state.user = null;
      } else if (!!Object.keys(action.payload).length) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      state.lastLoggedIn = Date.now();
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
      .addCase(logout.fulfilled, () => {
        /**
         * let rootReducer handle clear state
         */
      })
      .addCase(logout.rejected, () => {
        logger("auth", "logout fail");
      });
  },
});

export default auth.reducer;
export const { setUser, setLoggedIn, setRedirectToGroup } = auth.actions;
