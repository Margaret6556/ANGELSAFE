import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export interface ChildrenProps {
  children: React.ReactNode;
}

export type BackendResponse<T> = {
  data: T;
  status: number;
};
