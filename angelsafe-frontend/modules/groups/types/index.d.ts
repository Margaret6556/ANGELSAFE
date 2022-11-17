import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type ScreenProps } from "@/shared/types";
import { NavigatorScreenParams } from "@react-navigation/native";
import { PostsType } from "@/shared/api/post";
import { GroupsType, GroupDetailsType } from "@/shared/api/groups";

export type { GroupsType, GroupDetailsType };
export type PartialGroupsType = Partial<GroupsType>;

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
  Details: PartialGroupsType;
  Members: { groupId: string };
  ViewProfile: { id: string };
  PostComments: PostsType;
  EditGroup: PartialGroupsType;
};
