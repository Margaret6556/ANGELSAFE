import React, { useCallback, useEffect } from "react";
import { ChildrenProps } from "@/shared/types";
import { SafeAreaView } from "react-native-safe-area-context";
import MainStatusBar from "../MainStatusBar";
import useDarkMode from "@/shared/hooks/useDarkMode";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { makeStyles, useTheme } from "@rneui/themed";
import { setSafeAreaBg, setThemeFontSize } from "@/shared/state/reducers/theme";

interface LayoutProps extends ChildrenProps {
  onLayout: () => Promise<void>;
}
const Layout = ({ children, onLayout }: LayoutProps) => {
  useDarkMode();
  const { fontSizeMultiplier, safeAreaBg } = useAppSelector(
    (state) => state.theme
  );
  const { updateTheme } = useTheme();
  const dispatch = useAppDispatch();
  const styles = useStyles({
    color: safeAreaBg,
  });

  useEffect(() => {
    dispatch(setThemeFontSize(fontSizeMultiplier));
    dispatch(setSafeAreaBg("transparent"));

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

const useStyles = makeStyles((_, props: { color: string }) => ({
  container: {
    backgroundColor: props.color,
    flex: 1,
    zIndex: 2,
  },
}));
