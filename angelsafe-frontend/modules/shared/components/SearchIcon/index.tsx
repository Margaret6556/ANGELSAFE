import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SearchIconProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const SearchIcon = ({ style, onPress }: SearchIconProps) => {
  const handlePress = () => {
    onPress && onPress();
  };
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
      <Icon
        type="entypo"
        name="magnifying-glass"
        iconProps={{
          size: 22,
          name: "magnifying-glass",
        }}
        containerStyle={[styles.containerStyle, style]}
      />
    </TouchableOpacity>
  );
};

export default SearchIcon;

const styles = StyleSheet.create({
  containerStyle: {
    // marginRight: 20,
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 50,
    width: 45,
    justifyContent: "center",
  },
});
