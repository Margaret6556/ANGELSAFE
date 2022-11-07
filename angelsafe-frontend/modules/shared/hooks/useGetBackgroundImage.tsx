import {} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from ".";
import {
  BackgroundImage,
  BackgroundImageThemes,
} from "../state/reducers/theme";

const useGetBackgroundImage = () => {
  const { backgroundImage } = useAppSelector((state) => state.theme);
  const [bg, setBg] = useState(BackgroundImageThemes.DEFAULT);

  useEffect(() => {
    switch (backgroundImage) {
      case BackgroundImage.VARIANT1:
        setBg(BackgroundImageThemes.VARIANT1);
        break;
      case BackgroundImage.VARIANT2:
        setBg(BackgroundImageThemes.VARIANT2);
        break;
      case BackgroundImage.VARIANT3:
        setBg(BackgroundImageThemes.VARIANT3);
        break;
      case BackgroundImage.VARIANT4:
        setBg(BackgroundImageThemes.VARIANT4);
        break;
      case BackgroundImage.VARIANT5:
        setBg(BackgroundImageThemes.VARIANT5);
        break;
      default:
        setBg(BackgroundImageThemes.DEFAULT);
        break;
    }
  }, [backgroundImage]);

  return bg;
};

export default useGetBackgroundImage;
