import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Icon, makeStyles } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";

interface SearchIconProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const SearchIcon = ({ style, onPress }: SearchIconProps) => {
  const handlePress = () => {
    onPress && onPress();
  };
  const styles = useStyles();
  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
        <Icon
          type="entypo"
          name="magnifying-glass"
          size={moderateScale(24)}
          containerStyle={[styles.containerStyle, style]}
        />
      </TouchableOpacity>
    </>
  );
};

export default SearchIcon;

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    height: moderateScale(42),
    width: moderateScale(42),
    justifyContent: "center",
  },
}));
