import React from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { ChildrenProps } from "@/shared/types";

const Layout = ({ children }: ChildrenProps) => (
  <ImageBackground
    source={require("../../../../assets/bg.png")}
    style={styles.container}
    resizeMode="cover"
  >
    {children}
  </ImageBackground>
);

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
