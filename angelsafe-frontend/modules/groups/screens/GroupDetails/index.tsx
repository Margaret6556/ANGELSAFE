import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetailsParamList, GroupParamsList } from "../../types";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransitionSlide } from "@/shared/components";
import Details from "./Details";
import Members from "./Members";
import ViewProfile from "./ViewProfile";

const GroupDetailsStack = createStackNavigator<GroupDetailsParamList>();

const GroupScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<GroupParamsList, "GroupDetails">) => {
  return (
    <GroupDetailsStack.Navigator
      initialRouteName="Details"
      screenOptions={{
        ...TransitionSlide,
        header: () => null,
      }}
    >
      <GroupDetailsStack.Screen
        name="Details"
        component={Details}
        initialParams={{
          id: route.params.id,
        }}
      />
      <GroupDetailsStack.Screen
        name="Members"
        component={Members}
        options={{ presentation: "modal" }}
      />
      <GroupDetailsStack.Screen
        name="ViewProfile"
        component={ViewProfile}
      />
      {/* <GroupDetailsStack.Screen name="GroupInfo" component={GroupInfo} />
      <GroupDetailsStack.Screen name="GroupPhoto" component={GroupPhoto} /> */}
    </GroupDetailsStack.Navigator>
  );
};

export default GroupScreen;
