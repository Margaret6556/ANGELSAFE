import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomScreenProps, type ScreenProps } from "@/shared/types";

export type HomeParamsList = {
  Entry: {
    symptoms: string[];
  };
  "Add New Symptom": undefined;
};

export type HomeScreenProps<T, A extends keyof T> = ScreenProps<T, A>;
