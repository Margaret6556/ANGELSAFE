import ImageContainer from "./ImageContainer";
import ScrollViewContainer from "./ScrollViewContainer";
import KeyboardAvoidContainer from "./KeyboardAvoidContainer";
import ViewContainer from "./ViewContainer";

import {
  ImageBackgroundProps,
  KeyboardAvoidingViewProps,
  PressableProps,
  ScrollViewProps,
  ViewProps,
} from "react-native";
import React from "react";
import { ChildrenProps } from "@/shared/types";
import PressableContainer from "./PressableContainer";

interface IContainerProps extends ChildrenProps {
  containerProps?:
    | ScrollViewProps
    | ViewProps
    | ImageBackgroundProps
    | KeyboardAvoidingViewProps
    | PressableProps;
  type?: "scroll" | "image" | "keyboard" | "pressable";
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
    case "pressable":
      return (
        <PressableContainer
          {...(containerProps as PressableProps)}
          children={children}
        />
      );
    default:
      return (
        <ViewContainer {...(containerProps as ViewProps)} children={children} />
      );
  }
};

export default Container;
