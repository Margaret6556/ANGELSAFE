import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetailsParamList, GroupParamsList } from "../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { TransitionModal, TransitionSlide } from "@/shared/components";
import Details from "./Details";
import Members from "./Members";
import ViewProfile from "./ViewProfile";
import Comments from "./Comments";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";

const GroupDetailsStack = createStackNavigator<GroupDetailsParamList>();

const GroupScreen = ({}: StackScreenProps<GroupParamsList, "GroupDetails">) => {
  return (
    <GroupDetailsStack.Navigator
      screenOptions={{
        ...TransitionSlide,
      }}
    >
      <GroupDetailsStack.Screen
        name="Details"
        component={Details}
        options={{
          header: () => null,
        }}
      />
      <GroupDetailsStack.Screen
        name="Members"
        component={Members}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <GroupDetailsStack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{
          headerTitle: "Member Profile",
          headerBackTitleVisible: false,
        }}
      />
      <GroupDetailsStack.Screen
        name="PostComments"
        component={Comments}
        options={{
          headerTitle: "",
        }}
      />
    </GroupDetailsStack.Navigator>
  );
};

export default GroupScreen;
