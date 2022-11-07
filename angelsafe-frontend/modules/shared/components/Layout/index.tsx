import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ChildrenProps } from "@/shared/types";
import { SafeAreaView } from "react-native-safe-area-context";
import MainStatusBar from "../MainStatusBar";
import useDarkMode from "@/shared/hooks/useDarkMode";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { useTheme } from "@rneui/themed";

interface LayoutProps extends ChildrenProps {
  onLayout: () => Promise<void>;
}
const Layout = ({ children, onLayout }: LayoutProps) => {
  useDarkMode();
  const { fontSizeMultiplier } = useAppSelector((state) => state.theme);
  const { updateTheme } = useTheme();

  useEffect(() => {
    updateTheme({
      components: {
        Text: {
          style: {
            fontSize: generateFontSize(16),
            fontFamily: "nunitoRegular",
          },
          h2Style: {
            fontSize: generateFontSize(26),
          },
          h4Style: {
            fontSize: generateFontSize(22),
          },
        },
      },
    });
  }, [fontSizeMultiplier]);

  const generateFontSize = useCallback(
    (initial: number) => Math.round(initial * (0.9 + fontSizeMultiplier / 10)),
    [fontSizeMultiplier]
  );

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
