import { ExpoConfig, ConfigContext } from "@expo/config";

const env = process.env.NODE_ENV ?? "development";
const url =
  env === "development"
    ? "http://localhost:4001"
    : "https://mobile.angelsafe.co";

const androidDevServerUrl = "http://10.0.2.2:4001";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "AngelSafe",
  slug: "AngelSafe",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
      },
    ],
  ],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  androidStatusBar: {
    translucent: true,
    backgroundColor: "#000000",
  },
  ios: {
    bundleIdentifier: "com.hosnibona.dev.AngelSafe",
    jsEngine: "hermes",
  },
  android: {
    jsEngine: "hermes",
    softwareKeyboardLayoutMode: "resize",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.hosnibona.dev.AngelSafe",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "c024a972-33ba-456a-80c3-71695705b2cc",
    },
    server: {
      version: "v0.1.0",
      url,
      androidDevServerUrl,
    },
  },
});
