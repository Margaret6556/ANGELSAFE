import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { ChildrenProps } from "@/shared/types";
import { useAppSelector } from "@/shared/hooks";

interface LayoutProps extends ChildrenProps {}
const ImageBackgroundContainer = ({ children }: LayoutProps) => {
  const { backgroundColor, solidBackground } = useAppSelector(
    (state) => state.theme
  );

  return (
    <ImageBackground
      source={require("../../../../assets/bg.png")}
      style={[styles.container, { backgroundColor }]}
      resizeMode="cover"
      imageStyle={{ opacity: solidBackground ? 0 : 1 }}
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
