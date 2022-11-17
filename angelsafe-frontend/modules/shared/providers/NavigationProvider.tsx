import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import { useColorScheme } from "react-native";
import useIsDark from "../hooks/useIsDark";
import useThemeMode from "../hooks/useThemeMode";
import { ChildrenProps } from "../types";

const NavigationProvider = ({ children }: ChildrenProps) => {
  useThemeMode();
  const isDark = useIsDark();
  const { theme } = useTheme();
  const navigationTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          text: theme.colors.primary,
          primary: theme.colors.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          text: theme.colors.primary,
          primary: theme.colors.primary,
          background: "transparent",
        },
      };

  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
};

export default NavigationProvider;
