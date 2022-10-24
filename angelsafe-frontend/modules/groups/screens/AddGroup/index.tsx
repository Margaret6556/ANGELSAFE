import { createStackNavigator } from "@react-navigation/stack";
import { AddGroupParamList, GroupParamsList } from "../../types";
import GroupInfo from "./GroupInfo";
import GroupPhoto from "./GroupPhoto";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransitionScreen } from "@/shared/components";

const GroupStack = createStackNavigator<AddGroupParamList>();

const GroupScreen = ({
  navigation,
}: NativeStackScreenProps<GroupParamsList, "Add Group">) => {
  return (
    <GroupStack.Navigator
      initialRouteName="GroupInfo"
      screenOptions={{
        ...TransitionScreen,
        header: () => null,
      }}
    >
      <GroupStack.Screen name="GroupInfo" component={GroupInfo} />
      <GroupStack.Screen name="GroupPhoto" component={GroupPhoto} />
    </GroupStack.Navigator>
  );
};

export default GroupScreen;
