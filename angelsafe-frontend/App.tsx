import React, { useEffect, useCallback } from "react";
import Provider from "./modules/shared/providers";
import Main from "./modules/app";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_300Light,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_400Regular_Italic,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View } from "react-native";

const App = () => {
  const [fontsLoaded] = useFonts({
    nunitoLight: Nunito_300Light,
    nunitoRegular: Nunito_400Regular,
    nunitoMedium: Nunito_500Medium,
    nunitoBold: Nunito_600SemiBold,
    nunitoItalic: Nunito_400Regular_Italic,
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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider onLayoutView={onLayoutRootView}>
      <Main />
    </Provider>
  );
};

export default App;
