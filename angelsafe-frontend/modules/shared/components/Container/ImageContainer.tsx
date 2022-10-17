import React from "react";
import { ChildrenProps } from "@/shared/types";
import { ImageBackground, ImageBackgroundProps } from "react-native";
import { containerStyle } from "@/shared/styles";

const ImageContainer = (props: ImageBackgroundProps) => {
  const source = props?.source || require("../../../../assets/bg.png");
  const style = {
    ...containerStyle.container,
    ...{ backgroundColor: "rgba(255,255,255,0.9)" },
    ...(props?.style as {}),
  };
  const imageBackgroundProps = { ...props, source, style };
  return React.createElement(ImageBackground, {
    ...{
      resizeMode: "cover",
      ...imageBackgroundProps,
    },
  });
};

export default ImageContainer;
