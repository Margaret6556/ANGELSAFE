import { Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { makeStyles } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

interface SocialIconProps {
  iconProps: {
    type: string;
    name: string;
  };
  isEnabledIcon: {
    type: string;
    name: string;
  };
  label: string | number;
  enabled?: boolean;
  enabledColor?: string;
  onPress: () => void;
}

const SocialIcon = (props: SocialIconProps) => {
  const styles = useStyles();
  const handleOnPress = () => {
    props.onPress();
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.socialIconContainer}>
        <Icon
          type={props.enabled ? props.isEnabledIcon.type : props.iconProps.type}
          name={props.enabled ? props.isEnabledIcon.name : props.iconProps.name}
          size={moderateScale(16)}
          color={props.enabled ? props.enabledColor : ""}
        />
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialIcon;

const useStyles = makeStyles((theme) => ({
  socialIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.lg,
  },
  label: {
    fontSize: moderateScale(14),
    marginLeft: theme.spacing.sm,
    color: theme.colors.black,
  },
}));
