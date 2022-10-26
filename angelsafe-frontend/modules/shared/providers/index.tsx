import React from "react";
import { Provider } from "react-redux";
import store from "@/shared/state";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ChildrenProps } from "../types";
import { Layout } from "../components";
import ThemeProvider from "./theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ImageBackgroundContainer from "../components/Layout/ImageBackground";

interface ProviderProps extends ChildrenProps {
  onLayoutView: () => Promise<void>;
}

const Providers = ({ children, onLayoutView }: ProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ImageBackgroundContainer>
          <NavigationContainer
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: "transparent",
              },
            }}
          >
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
