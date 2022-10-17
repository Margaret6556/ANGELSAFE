import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";

export type ChatParamsList = {
  Entry: undefined;
};

export type ChatScreenProps<T, A extends keyof T> = ScreenProps<T, A>;
