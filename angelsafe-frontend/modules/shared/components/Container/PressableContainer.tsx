import React from "react";
import { Pressable, PressableProps } from "react-native";
import { containerStyle } from "@/shared/styles";
import { ChildrenProps } from "@/shared/types";

interface PressableContainerProps extends PressableProps {}

const PressableContainer = (props: PressableContainerProps) => {
  const style = {
    ...containerStyle.container,
    ...(props?.style as {}),
  };
  const viewProps = { ...props, style };

  return React.createElement(Pressable, viewProps);
};

export default PressableContainer;
