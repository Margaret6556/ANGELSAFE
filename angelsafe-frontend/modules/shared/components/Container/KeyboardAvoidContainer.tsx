import React from "react";
import { ChildrenProps } from "@/shared/types";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from "react-native";
import { containerStyle } from "@/shared/styles";

interface IContainer extends ChildrenProps {
  containerProps?: KeyboardAvoidingViewProps;
}

const _KeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
  const style = {
    ...containerStyle.container,
    ...(props?.style as {}),
  };
  const viewProps: KeyboardAvoidingViewProps = {
    behavior: "height",
    ...props,
    style,
  };

  return React.createElement(KeyboardAvoidingView, viewProps);
};

export default _KeyboardAvoidingView;
