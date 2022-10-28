import React from "react";
import { Provider } from "react-redux";
import store from "@/shared/state";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ChildrenProps } from "../types";
import { Layout } from "../components";
import ThemeProvider from "./theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ImageBackgroundContainer from "../components/Layout/ImageBackground";
import { useColorScheme } from "react-native";

interface ProviderProps extends ChildrenProps {
  onLayoutView: () => Promise<void>;
}

const Providers = ({ children, onLayoutView }: ProviderProps) => {
  const colorScheme = useColorScheme();
  const navigationTheme =
    colorScheme === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "transparent",
          },
        };
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ImageBackgroundContainer>
          <NavigationContainer theme={navigationTheme}>
            <SafeAreaProvider>
              <Layout onLayout={onLayoutView}>{children}</Layout>
            </SafeAreaProvider>
          </NavigationContainer>
        </ImageBackgroundContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
