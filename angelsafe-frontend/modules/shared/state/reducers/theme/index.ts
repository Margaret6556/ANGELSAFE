import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum BackgroundImage {
  DEFAULT = 0,
  VARIANT1,
  VARIANT2,
  VARIANT3,
  VARIANT4,
  VARIANT5,
}

export const BackgroundImageThemes = {
  DEFAULT: require("../../../../../assets/bg.png"),
  VARIANT1: require("../../../../../assets/bg1.jpeg"),
  VARIANT2: require("../../../../../assets/bg2.jpeg"),
  VARIANT3: require("../../../../../assets/bg3.jpeg"),
  VARIANT4: require("../../../../../assets/bg4.jpeg"),
  VARIANT5: require("../../../../../assets/bg5.jpeg"),
};

const initialState = {
  backgroundImage: BackgroundImage.DEFAULT,
  fontSizeMultiplier: 1,
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
    setBackgroundImage: (state, action: PayloadAction<BackgroundImage>) => {
      state.backgroundImage = action.payload;
    },
    setThemeFontSize: (state, action: PayloadAction<number>) => {
      state.fontSizeMultiplier = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const {
  setBackgroundColor,
  setSolidBackground,
  setManualDarkMode,
  setBackgroundImage,
  setThemeFontSize,
} = themeSlice.actions;
