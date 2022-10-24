import React, { useEffect, useCallback } from "react";
import Provider from "./modules/shared/providers";
import Main from "./modules/app";
import { StyleSheet } from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_300Light,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Loading } from "./modules/shared/components";

const App = () => {
  const [fontsLoaded, error] = useFonts({
    nunitoLight: Nunito_300Light,
    nunitoRegular: Nunito_400Regular,
    nunitoMedium: Nunito_500Medium,
    nunitoBold: Nunito_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Provider>
      <SafeAreaProvider>
        <SafeAreaView
          style={styles.wrapper}
          onLayout={onLayoutRootView}
          edges={["right", "left", "top"]}
        >
          <StatusBar style="auto" />
          <Main />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
