import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  backgroundColor: "transparent",
  solidBackground: false,
  manualDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    setSolidBackground: (state, action: PayloadAction<boolean>) => {
      state.solidBackground = action.payload;
    },
    setManualDarkMode: (state, action: PayloadAction<boolean>) => {
      state.manualDarkMode = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { setBackgroundColor, setSolidBackground, setManualDarkMode } =
  themeSlice.actions;
