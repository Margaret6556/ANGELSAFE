import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, useTheme } from "@rneui/themed";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";
import { StyleConstants } from "@/shared/styles";

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
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{ marginBottom: 8, fontSize: 18, color: theme.colors.primary }}
      >
        {props.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.background,
          maxWidth: "100%",
          borderRadius: 12,
          height: 50,
        }}
      >
        <Icon
          {...props.iconProps}
          color="#546AF1"
          style={{
            paddingLeft: 12,
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
            height: 50,
          }}
          labelStyle={{
            fontFamily: "nunitoRegular",
            fontSize: 16,
            paddingLeft: 8,
          }}
          style={{
            borderColor: theme.colors.white,
            height: StyleConstants.BUTTON_HEIGHT,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
            backgroundColor: "#fefefe",
            left: "-10%",
            width:
              Dimensions.get("screen").width -
              StyleConstants.PADDING_HORIZONTAL * 2.5,
          }}
          listItemLabelStyle={{
            fontFamily: "nunitoRegular",
            fontSize: 16,
          }}
          placeholderStyle={{
            fontFamily: "nunitoRegular",
            fontSize: 16,
            paddingLeft: 8,
          }}
          {...props}
        />
      </View>
      <Text style={{ color: "red", fontSize: 12, marginTop: 8 }}>
        {props.errorMessage}
      </Text>
    </View>
  );
});

export default DropDownInput;
