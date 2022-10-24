import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";

export type MoreParamsList = {
  Entry: undefined;
  Chat: undefined;
};

export type ChatParamsList = {
  ChatList: undefined;
  ChatInterface: {
    id: string;
  };
};

export type MoreScreenProps<T, A extends keyof T> = ScreenProps<T, A>;

interface IMoreData {
  label: string;
  icon: any;
  onPress?: (e?: any) => void;
}

export type MoreDataType = IMoreData[];
