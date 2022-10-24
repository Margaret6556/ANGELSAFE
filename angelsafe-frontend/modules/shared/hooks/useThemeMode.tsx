import { useColorScheme } from "react-native";
import { useThemeMode as _useThemeMode } from "@rneui/themed";
import { useEffect } from "react";

const useThemeMode = () => {
  const colorScheme = useColorScheme();
  const { setMode, mode } = _useThemeMode();

  useEffect(() => {
    if (colorScheme === "dark") {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [colorScheme]);

  return mode;
};

export default useThemeMode;
