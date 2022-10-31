import { AuthReducer, ThemeReducer, ExperienceReducer } from "./reducers";
import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api";

const appReducer = combineReducers({
  auth: AuthReducer,
  theme: ThemeReducer,
  experience: ExperienceReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const RootReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === "auth/logout/fulfilled") {
    state = {} as RootState;
    console.log("Logged out, state cleared");
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
