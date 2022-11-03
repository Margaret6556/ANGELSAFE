import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export interface ChildrenProps {
  children: React.ReactNode;
}

export type BackendResponse<T> = {
  data: T;
  status: number;
};

export type BackendErrorResponse = {
  error: string;
  message: string;
  status: number;
};

export type AppTabParamList = {
  Alerts: undefined;
  Home: undefined;
  Groups: undefined;
  More: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  mobile: string;
  mobileNumber: string;
  token: string;
  year: string;
  gender: "Male" | "Female";
  country: string;
  member: string;
  bio: string;
  profilePic: string;
  hobbies: string[];
  music: string[];
  movies: string[];
  winCount: number;
  painCount: number;
};
