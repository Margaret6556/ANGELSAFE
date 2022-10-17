import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";

export type AlertParamsList = {
  Entry: undefined;
};

export type AlertScreenProps<T, A extends keyof T> = ScreenProps<T, A>;
