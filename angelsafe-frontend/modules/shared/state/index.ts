import { AuthReducer, ThemeReducer, ExperienceReducer } from "./reducers";
import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { setupListeners } from "@reduxjs/toolkit/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [apiSlice.reducerPath],
};

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

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
