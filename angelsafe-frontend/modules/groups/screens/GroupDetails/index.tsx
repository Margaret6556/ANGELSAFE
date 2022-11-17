import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetailsParamList, GroupParamsList } from "../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { TransitionModal, TransitionSlide } from "@/shared/components";
import Details from "./Details";
import Members from "./Members";
import ViewProfile from "./ViewProfile";
import Comments from "./Comments";
import EditGroup from "./EditGroup";
import { useTheme } from "@rneui/themed";

const GroupDetailsStack = createStackNavigator<GroupDetailsParamList>();

const GroupScreen = ({}: StackScreenProps<GroupParamsList, "GroupDetails">) => {
  const { theme } = useTheme();
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
          header: () => null,
        }}
      />
      <GroupDetailsStack.Screen
        name="EditGroup"
        component={EditGroup}
        options={{
          header: () => null,
        }}
      />
    </GroupDetailsStack.Navigator>
  );
};

export default GroupScreen;
