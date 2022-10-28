import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useAppDispatch } from ".";
import {
  setBackgroundColor,
  setSolidBackground,
} from "../state/reducers/theme";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (colorScheme === "dark") {
      setIsDark(true);
      dispatch(setBackgroundColor("#000"));
      dispatch(setSolidBackground(true));
    } else {
      setIsDark(false);
      dispatch(setBackgroundColor("transparent"));
      dispatch(setSolidBackground(false));
    }
  }, [colorScheme]);

  return isDark;
};

export default useDarkMode;
