import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";

export type MoreParamsList = {
  Entry: undefined;
  Chat: undefined;
  "Account Security": undefined;
};

export type ChatParamsList = {
  ChatList: undefined;
  ChatInterface: {
    id: string;
    username: string;
    profilePic: string;
  };
};

interface CardProps {
  label: string;
  icon: {
    name: string;
    type: string;
  };
  onPress?: (e?: any) => void;
}

export type MoreDataType = IMoreData[];
