import {
  ThemeProvider as RneuiThemeProvider,
  createTheme as createRneuiTheme,
  darkColors,
  lightColors,
  CreateThemeOptions,
} from "@rneui/themed";
import { ChildrenProps } from "@/shared/types";
import { scale, moderateScale } from "react-native-size-matters";
import { useColorScheme } from "react-native";

import { useMemo } from "react";

const spacing = {
  xs: scale(2),
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(24),
} as const;

export const sizing = {
  AVATAR: scale(45),
  BORDER_RADIUS: moderateScale(10, 0.5),
  BUTTON: moderateScale(50, 0.5),
  ICON: scale(32),
  CHECKBOX: scale(24),
  FONT: {
    xs: scale(8),
    sm: scale(14),
    md: scale(16),
    lg: scale(22),
    xl: scale(26),
  },
} as const;

const lightTheme = {
  ...lightColors,
  primary: "#031166",
  secondary: "#465BE6",
  grey0: "#898989",
} as const;

const darkTheme = {
  ...darkColors,
  primary: "#465BE6",
  secondary: "#465BE6",
  grey0: "#898989",
  white: "#212427",
} as const;

export const createDynamicTheme = (isDark: boolean): CreateThemeOptions => ({
  lightColors: {
    ...lightTheme,
  },
  darkColors: { ...darkTheme },
  spacing,
  components: {
    Avatar: {
      size: sizing.AVATAR,
    },
    Button: {
      raised: false,
      radius: sizing.BORDER_RADIUS,
      buttonStyle: {
        height: sizing.BUTTON,
        paddingVertical: 0,
      },
      titleStyle: {
        fontFamily: "nunitoBold",
        fontSize: sizing.FONT.md,
      },
    },
    CheckBox: {
      wrapperStyle: {
        paddingHorizontal: 0,
      },
      containerStyle: {
        backgroundColor: "transparent",
        paddingHorizontal: 0,
      },
    },
    Icon: {
      size: sizing.ICON,
    },
    Input: {
      inputStyle: {
        backgroundColor: isDark
          ? "rgba(100,100,100,0.65)"
          : "rgba(255,255,255,0.85)",
        borderRadius: sizing.BORDER_RADIUS,
        paddingHorizontal: spacing.lg,
        height: sizing.BUTTON,
        fontSize: sizing.FONT.md,
      },
      labelStyle: {
        marginBottom: spacing.md,
        color: isDark ? darkTheme.primary : lightTheme.primary,
        fontFamily: "nunitoRegular",
        fontSize: sizing.FONT.sm,
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
      },
      containerStyle: {
        paddingHorizontal: 0,
      },
      leftIconContainerStyle: {
        backgroundColor: isDark ? lightTheme.grey5 : lightTheme.background,
        paddingVertical: 0,
        marginVertical: 0,
        height: sizing.BUTTON,
        borderTopLeftRadius: sizing.BORDER_RADIUS,
        borderBottomLeftRadius: sizing.BORDER_RADIUS,
        paddingLeft: spacing.lg,
      },
      rightIconContainerStyle: {
        backgroundColor: isDark ? lightTheme.grey5 : lightTheme.background,
        paddingVertical: 0,
        marginVertical: 0,
        height: sizing.BUTTON,
        borderTopRightRadius: sizing.BORDER_RADIUS,
        borderBottomRightRadius: sizing.BORDER_RADIUS,
        paddingRight: spacing.lg,
      },
    },
    ListItemCheckBox: {
      containerStyle: {
        backgroundColor: "transparent",
      },
      size: sizing.CHECKBOX,
    },
    Text: {
      style: {
        fontSize: sizing.FONT.md,
        fontFamily: "nunitoRegular",
      },
      h2Style: {
        fontSize: sizing.FONT.xl,
        color: isDark ? darkTheme.primary : lightTheme.primary,
      },
      h4Style: {
        fontSize: sizing.FONT.lg,
        color: isDark ? darkTheme.primary : lightTheme.primary,
      },
    },
  },
});

const ThemeProvider = ({ children }: ChildrenProps) => {
  const colorScheme = useColorScheme();
  const _theme = useMemo(() => createDynamicTheme(colorScheme === "dark"), []);
  const theme = createRneuiTheme(_theme);

  return <RneuiThemeProvider theme={theme}>{children}</RneuiThemeProvider>;
};

export default ThemeProvider;
