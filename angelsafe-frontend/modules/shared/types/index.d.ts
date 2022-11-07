import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { MoreParamsList } from "@/more/types";
import { GroupParamsList } from "@/groups/types";
import { AlertParamsList } from "@/alerts/types";
import { HomeParamsList } from "@/home/types";
import { ProfileParamsList } from "@/profile/types";

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
  Alerts: Navigator<AlertParamsList>;
  Home: Navigator<HomeParamsList>;
  Groups: NavigatorScreenParams<GroupParamsList>;
  More: NavigatorScreenParams<MoreParamsList>;
  Profile: Navigator<ProfileParamsList>;
};

export type RootStackParamList = {
  Auth: undefined;
  App: NavigatorScreenParams<AppTabParamList>;
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
