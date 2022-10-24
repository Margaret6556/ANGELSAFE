import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";

export type GroupParamsList = {
  Entry: undefined;
  GroupDetails: { id: string };
  "Add Group": undefined;
};

export type AddGroupParamList = {
  GroupInfo: undefined;
  GroupPhoto: { id: string };
};

export { GroupsType } from "@/shared/api/groups";
