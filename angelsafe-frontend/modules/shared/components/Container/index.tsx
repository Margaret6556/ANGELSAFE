import ImageContainer from "./ImageContainer";
import ScrollViewContainer from "./ScrollViewContainer";
import KeyboardAvoidContainer from "./KeyboardAvoidContainer";
import ViewContainer from "./ViewContainer";

import {
  ImageBackgroundProps,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  ViewProps,
} from "react-native";
import React from "react";
import { ChildrenProps } from "@/shared/types";

interface IContainerProps extends ChildrenProps {
  containerProps?:
    | ScrollViewProps
    | ViewProps
    | ImageBackgroundProps
    | KeyboardAvoidingViewProps;
  type?: "scroll" | "image" | "keyboard";
}

const Container = ({ type, containerProps, children }: IContainerProps) => {
  switch (type) {
    case "scroll":
      return (
        <ScrollViewContainer
          {...(containerProps as ScrollViewProps)}
          children={children}
        />
      );
    case "image":
      return (
        <ImageContainer
          {...(containerProps as ImageBackgroundProps)}
          children={children}
        />
      );
    case "keyboard":
      return (
        <KeyboardAvoidContainer
          {...(containerProps as KeyboardAvoidingViewProps)}
          children={children}
        />
      );
    default:
      return <ViewContainer {...containerProps} children={children} />;
  }
};

export default Container;
