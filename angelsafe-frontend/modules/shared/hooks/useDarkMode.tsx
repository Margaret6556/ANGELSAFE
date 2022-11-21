import { useEffect, useRef } from "react";
import { useTheme, useThemeMode } from "@rneui/themed";
import { useAppDispatch } from ".";
import { createDynamicTheme } from "../providers/ThemeProvider";
import {
  setBackgroundColor,
  setSolidBackground,
} from "../state/reducers/theme";
import useIsDark from "./useIsDark";

const useDarkMode = () => {
  const isDark = useIsDark();
  const prev = useRef(isDark);
  const { replaceTheme } = useTheme();
  const { setMode } = useThemeMode();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prev.current !== isDark) {
      const newTheme = createDynamicTheme(isDark);
      replaceTheme(newTheme);
      dispatch(setBackgroundColor(isDark ? "#000" : "transparent"));
      prev.current = isDark;
    }
    setMode(isDark ? "dark" : "light");
  }, [isDark, setBackgroundColor]);
};

export default useDarkMode;
