import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { ChildrenProps } from "@/shared/types";
import { SafeAreaView } from "react-native-safe-area-context";
import MainStatusBar from "../MainStatusBar";
import useDarkMode from "@/shared/hooks/useDarkMode";

interface LayoutProps extends ChildrenProps {
  onLayout: () => Promise<void>;
}
const Layout = ({ children, onLayout }: LayoutProps) => {
  useDarkMode();
  return (
    <>
      <MainStatusBar />
      <SafeAreaView
        style={styles.container}
        onLayout={onLayout}
        edges={["right", "left", "top"]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
});
