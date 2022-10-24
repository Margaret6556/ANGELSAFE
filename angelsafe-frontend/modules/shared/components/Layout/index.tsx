import React from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { ChildrenProps } from "@/shared/types";
import { useAppSelector } from "@/shared/hooks";

const Layout = ({ children }: ChildrenProps) => {
  const { backgroundColor, solidBackground } = useAppSelector(
    (state) => state.theme
  );

  return (
    <ImageBackground
      source={require("../../../../assets/bg.png")}
      style={[styles.container, { backgroundColor }]}
      resizeMode="cover"
      imageStyle={{
        opacity: solidBackground ? 0 : 1,
      }}
    >
      {children}
    </ImageBackground>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
