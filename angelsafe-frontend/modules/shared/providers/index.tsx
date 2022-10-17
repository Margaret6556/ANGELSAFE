import React from "react";
import { Provider } from "react-redux";
import store from "@/shared/state";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ChildrenProps } from "../types";
import { Layout } from "../components";
import ThemeProvider from "./theme";

const Providers = ({ children }: ChildrenProps) => (
  <Provider store={store}>
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "transparent",
        },
      }}
    >
      <Layout>
        <ThemeProvider>{children}</ThemeProvider>
      </Layout>
    </NavigationContainer>
  </Provider>
);

export default Providers;
