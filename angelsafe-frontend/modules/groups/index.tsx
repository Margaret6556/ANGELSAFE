import { createStackNavigator } from "@react-navigation/stack";
import { GroupParamsList } from "./types";
import { EntryScreen, GroupDetailsScreen } from "./screens";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/app";
import { Header } from "./components";
import { TransitionScreen } from "@/shared/components";

const GroupStack = createStackNavigator<GroupParamsList>();

const GroupScreen = ({
  navigation,
}: NativeStackScreenProps<TabParamList, "Groups">) => {
  return (
    <GroupStack.Navigator
      screenOptions={{
        ...TransitionScreen,
      }}
    >
      <GroupStack.Screen
        name="Entry"
        component={EntryScreen}
        options={{ header: () => <Header /> }}
      />
      <GroupStack.Screen name="GroupDetails" component={GroupDetailsScreen} />
    </GroupStack.Navigator>
  );
};

export default GroupScreen;
