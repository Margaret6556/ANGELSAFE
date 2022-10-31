import { ImageSourcePropType } from "react-native";
import { CustomScreenProps, type ScreenProps } from "@/shared/types";
import { Moods } from "@/shared/state/reducers/experience";

export type HomeParamsList = {
  Entry: {
    symptoms: string[];
  };
  "Add New Symptom": undefined;
};

export type MoodsType = {
  id: string;
  label: Moods;
  image: ImageSourcePropType;
};
