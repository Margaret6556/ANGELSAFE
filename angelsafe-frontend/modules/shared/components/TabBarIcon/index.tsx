import React from "react";
import { Icon, useTheme } from "@rneui/themed";
import { moderateScale } from "react-native-size-matters";

interface TabBarIconProps {
  focused: boolean;
  iconProps: { type: string; name: string };
}

const TabBarIcon = (props: TabBarIconProps) => {
  const { theme } = useTheme();
  return (
    <Icon
      name={props.iconProps.name}
      type={props.iconProps.type}
      color={props.focused ? theme.colors.secondary : theme.colors.grey1}
      size={moderateScale(25, 0.5)}
    />
  );
};

export default TabBarIcon;
