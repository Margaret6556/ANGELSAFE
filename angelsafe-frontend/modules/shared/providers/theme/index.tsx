import {
  ThemeProvider as RneuiThemeProvider,
  createTheme,
  useThemeMode,
} from "@rneui/themed";
import { ChildrenProps } from "@/shared/types";
import { StyleConstants } from "@/shared/styles";

const lightTheme = {
  primary: "#031166",
  secondary: "#465BE6",
  grey0: "#898989",
};

const darkTheme = {
  primary: "#465BE6",
  secondary: "#465BE6",
  grey0: "#898989",
  white: "#212427",
};

const commonBorderRadius = 10;

const theme = createTheme({
  lightColors: {
    ...lightTheme,
  },
  darkColors: { ...darkTheme },
  components: {
    Button: {
      raised: false,
      radius: commonBorderRadius,
      size: "md",
      buttonStyle: {
        height: StyleConstants.BUTTON_HEIGHT,
      },
      titleStyle: {
        fontFamily: "nunitoBold",
      },
    },
    Text: {
      style: {
        fontSize: 16,
        fontFamily: "nunitoRegular",
      },
      h2Style: {
        fontSize: 26,
      },
      h4Style: {
        fontSize: 22,
      },
    },
    ListItemCheckBox: {
      containerStyle: {
        backgroundColor: "transparent",
      },
    },
    Input: {
      inputStyle: {
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: commonBorderRadius,
        paddingHorizontal: 12,
        height: StyleConstants.BUTTON_HEIGHT,
      },
      labelStyle: {
        marginBottom: 8,
        color: lightTheme.primary,
        fontSize: 18,
        fontFamily: "nunitoRegular",
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
      },
      containerStyle: {
        paddingHorizontal: 0,
      },
      leftIconContainerStyle: {
        backgroundColor: "#fff",
        paddingVertical: 0,
        marginVertical: 0,
        height: StyleConstants.BUTTON_HEIGHT,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingLeft: 12,
      },
      rightIconContainerStyle: {
        backgroundColor: "#fff",
        paddingVertical: 0,
        marginVertical: 0,
        height: StyleConstants.BUTTON_HEIGHT,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingRight: 12,
      },
    },
    CheckBox: {
      wrapperStyle: {
        paddingHorizontal: 0,
      },
      containerStyle: { backgroundColor: "transparent", paddingHorizontal: 0 },
    },
  },
});

const ThemeProvider = ({ children }: ChildrenProps) => {
  return <RneuiThemeProvider theme={theme}>{children}</RneuiThemeProvider>;
};

export default ThemeProvider;
