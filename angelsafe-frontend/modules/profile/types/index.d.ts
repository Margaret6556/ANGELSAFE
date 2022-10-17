import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";

export type ProfileParamsList = {
  Entry: undefined;
};

export type ProfileScreenProps<T, A extends keyof T> = ScreenProps<T, A>;
