import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, useTheme } from "@rneui/themed";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";
import { StyleConstants } from "@/shared/styles";
import { sizing } from "@/shared/providers/ThemeProvider";

type Custom = {
  title?: string;
  errorMessage?: string;
  iconProps: {
    name: string;
    type: string;
  };
} & DropDownPickerProps<any>;

const DropDownInput = React.forwardRef((props: Custom, ref) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <Text
        style={{
          marginBottom: theme.spacing.sm,
          fontSize: sizing.FONT.sm,
          color: theme.colors.primary,
        }}
      >
        {props.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.background,
          maxWidth: "100%",
          borderRadius: sizing.BORDER_RADIUS,
          height: sizing.BUTTON,
        }}
      >
        <Icon
          {...props.iconProps}
          color="#546AF1"
          style={{
            paddingLeft: theme.spacing.md,
          }}
        />
        <DropDownPicker
          listMode="SCROLLVIEW"
          containerStyle={{
            maxWidth: "90%",
          }}
          listItemContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            height: sizing.BUTTON,
          }}
          labelStyle={{
            fontFamily: "nunitoRegular",
            fontSize: sizing.FONT.md,
            paddingLeft: theme.spacing.sm,
          }}
          style={{
            borderColor: theme.colors.white,
            height: StyleConstants.BUTTON_HEIGHT,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
            backgroundColor: "#fefefe",
            left: "-10%",
            width: Dimensions.get("screen").width,
          }}
          listItemLabelStyle={{
            fontFamily: "nunitoRegular",
            fontSize: sizing.FONT.sm,
          }}
          placeholderStyle={{
            fontFamily: "nunitoRegular",
            fontSize: sizing.FONT.sm,
            paddingLeft: theme.spacing.sm,
          }}
          {...props}
        />
      </View>
      <Text
        style={{
          color: "red",
          fontSize: sizing.FONT.sm,
          marginTop: theme.spacing.sm,
        }}
      >
        {props.errorMessage}
      </Text>
    </View>
  );
});

export default DropDownInput;
