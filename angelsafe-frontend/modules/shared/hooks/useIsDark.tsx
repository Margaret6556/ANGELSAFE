import { useColorScheme } from "react-native";
import { useMemo } from "react";

const useIsDark = () => {
  const colorScheme = useColorScheme();
  return useMemo(() => colorScheme === "dark", [colorScheme]);
};

export default useIsDark;
