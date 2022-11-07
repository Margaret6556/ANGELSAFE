import React from "react";
import { ImageBackground, ImageBackgroundProps } from "react-native";
import { containerStyle } from "@/shared/styles";
import useGetBackgroundImage from "@/shared/hooks/useGetBackgroundImage";

const ImageContainer = (props: ImageBackgroundProps) => {
  const bg = useGetBackgroundImage();
  const source = props?.source || bg;
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
