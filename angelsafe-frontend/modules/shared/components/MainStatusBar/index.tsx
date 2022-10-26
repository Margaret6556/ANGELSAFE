import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useAppSelector } from "@/shared/hooks";

const MainStatusBar = () => {
  const { backgroundColor } = useAppSelector((state) => state.theme);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style="dark" backgroundColor={backgroundColor} />
    </View>
  );
};

export default MainStatusBar;

const styles = StyleSheet.create({
  container: {},
});
