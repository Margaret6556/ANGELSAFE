import React from "react";
import { ScrollViewProps, ScrollView } from "react-native";
import { containerStyle } from "@/shared/styles";

const ScrollViewContainer = (props: ScrollViewProps) => {
  const contentContainerStyle = {
    ...containerStyle.container,
    ...{ flex: 0, flexGrow: 1 },
    ...(props.contentContainerStyle as {}),
  };

  const scrollViewProps = { ...props, contentContainerStyle };

  return React.createElement(ScrollView, scrollViewProps);
};

export default ScrollViewContainer;
