import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store, { persistor } from "@/shared/state";
import { ChildrenProps } from "../types";
import { Layout } from "../components";
import ThemeProvider from "./ThemeProvider";
import ImageBackgroundContainer from "../components/Layout/ImageBackground";
import SocketProvider from "./SocketProvider";
import NavigationProvider from "./NavigationProvider";

interface ProviderProps extends ChildrenProps {
  onLayoutView: () => Promise<void>;
}

const Providers = ({ children, onLayoutView }: ProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <SocketProvider>
          <ThemeProvider>
            <ImageBackgroundContainer>
              <NavigationProvider>
                <SafeAreaProvider>
                  <Layout onLayout={onLayoutView}>{children}</Layout>
                </SafeAreaProvider>
              </NavigationProvider>
            </ImageBackgroundContainer>
          </ThemeProvider>
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
