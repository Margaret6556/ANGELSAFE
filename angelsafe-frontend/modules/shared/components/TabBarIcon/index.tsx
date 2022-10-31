import React from "react";
import { Icon, useTheme } from "@rneui/themed";

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
    />
  );
};

export default TabBarIcon;
