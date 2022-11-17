import { useEffect, useRef } from "react";
import { useTheme } from "@rneui/themed";
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (prev.current !== isDark) {
      const newTheme = createDynamicTheme(isDark);
      replaceTheme(newTheme);
      dispatch(setBackgroundColor(isDark ? "#000" : "transparent"));
      prev.current = isDark;
    }
  }, [isDark, setBackgroundColor]);
};

export default useDarkMode;
