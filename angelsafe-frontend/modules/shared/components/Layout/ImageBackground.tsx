import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  useColorScheme,
  View,
} from "react-native";
import { ChildrenProps } from "@/shared/types";
import { useAppSelector } from "@/shared/hooks";
import {
  BackgroundImage,
  BackgroundImageThemes,
} from "@/shared/state/reducers/theme";

interface LayoutProps extends ChildrenProps {}

const ImageBackgroundContainer = ({ children }: LayoutProps) => {
  const colorScheme = useColorScheme();
  const { backgroundColor, solidBackground, backgroundImage } = useAppSelector(
    (state) => state.theme
  );

  const handleSetBg = useCallback((bgEnum: BackgroundImage) => {
    switch (bgEnum) {
      case BackgroundImage.VARIANT1:
        return BackgroundImageThemes.VARIANT1;
      case BackgroundImage.VARIANT2:
        return BackgroundImageThemes.VARIANT2;
      case BackgroundImage.VARIANT3:
        return BackgroundImageThemes.VARIANT3;
      case BackgroundImage.VARIANT4:
        return BackgroundImageThemes.VARIANT4;
      case BackgroundImage.VARIANT5:
        return BackgroundImageThemes.VARIANT5;
      default:
        return BackgroundImageThemes.DEFAULT;
    }
  }, []);

  return (
    <ImageBackground
      source={handleSetBg(backgroundImage)}
      style={[styles.container, { backgroundColor }]}
      resizeMode="cover"
      imageStyle={{
        opacity: solidBackground || colorScheme === "dark" ? 0 : 1,
      }}
    >
      {children}
    </ImageBackground>
  );
};

export default ImageBackgroundContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
});
