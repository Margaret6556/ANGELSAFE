import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthParamList = {
  Entry: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthLoginParamsList = {
  "Input Number": undefined;
  "Verify Number": {
    mobileNumber: string;
  };
  "Email Login": undefined;
};

export type AuthRegisterParamList = {
  "Create an Account": undefined;
  "Account Information": undefined;
  "Verify Number": {
    mobileNumber: string;
  };
  "Sign Up": undefined;
  "Account Created": undefined;
};
