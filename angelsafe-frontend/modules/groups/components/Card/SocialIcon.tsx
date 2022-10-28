import { Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { makeStyles } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";

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
          size={18}
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
    marginTop: 12,
  },
  label: {
    fontSize: 16,
    marginLeft: 4,
    // marginTop: 4,
  },
}));
