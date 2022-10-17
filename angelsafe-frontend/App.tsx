import React, { useEffect, useCallback } from "react";
import Provider from "./modules/shared/providers";
import Main from "./modules/app";
import { StyleSheet } from "react-native";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const [fontsLoaded] = useFonts({ Nunito_400Regular });

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
