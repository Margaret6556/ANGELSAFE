import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";
import { NavigatorScreenParams } from "@react-navigation/native";

export type GroupParamsList = {
  Entry: undefined;
  GroupDetails: NavigatorScreenParams<GroupDetailsParamList>;
  "Add Group": undefined;
};

export type AddGroupParamList = {
  GroupInfo: undefined;
  GroupPhoto: { id: string };
};

export type GroupDetailsParamList = {
  Details: { id: string };
  Members: { groupId: string };
  ViewProfile: { id: string };
};

export { GroupsType } from "@/shared/api/groups";
