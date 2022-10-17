import React from "react";
import { ChildrenProps } from "@/shared/types";
import { View, ViewProps } from "react-native";
import { containerStyle } from "@/shared/styles";

interface IContainer extends ChildrenProps {
  props?: ViewProps;
}

const Container = (props: ViewProps) => {
  const style = {
    ...containerStyle.container,
    ...(props?.style as {}),
  };
  const viewProps = { ...props, style };

  return React.createElement(View, viewProps);
};

export default Container;
