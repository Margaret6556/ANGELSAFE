import { createStackNavigator } from "@react-navigation/stack";
import { GroupParamsList } from "./types";
import { AddGroupScreen, EntryScreen, GroupDetailsScreen } from "./screens";
import { AppTabParamList } from "@/shared/types";
import { Header } from "./components";
import { TransitionModal, TransitionSlide } from "@/shared/components";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import GroupsProvider from "./components/GroupsContext";

const GroupStack = createStackNavigator<GroupParamsList>();

const GroupScreen = ({}: BottomTabScreenProps<AppTabParamList, "Groups">) => {
  const { theme } = useTheme();
  return (
    <GroupsProvider>
      <GroupStack.Navigator screenOptions={{}}>
        <GroupStack.Screen
          name="Entry"
          component={EntryScreen}
          options={{ header: () => <Header /> }}
        />
        <GroupStack.Screen
          name="GroupDetails"
          component={GroupDetailsScreen}
          options={{
            ...TransitionSlide,
            header: () => null,
          }}
        />
        <GroupStack.Screen
          name="Add Group"
          component={AddGroupScreen}
          options={{
            ...TransitionModal,
            cardStyle: {
              backgroundColor: theme.colors.grey5,
            },
            headerBackTitleVisible: false,
          }}
        />
      </GroupStack.Navigator>
    </GroupsProvider>
  );
};

export default GroupScreen;
