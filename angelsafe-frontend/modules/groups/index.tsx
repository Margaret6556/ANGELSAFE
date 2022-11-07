import { createStackNavigator } from "@react-navigation/stack";
import { GroupParamsList } from "./types";
import { AddGroupScreen, EntryScreen, GroupDetailsScreen } from "./screens";
import { AppTabParamList } from "@/shared/types";
import { Header } from "./components";
import { SearchIcon, TransitionSlide } from "@/shared/components";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "@rneui/themed";

const GroupStack = createStackNavigator<GroupParamsList>();

const GroupScreen = ({}: BottomTabScreenProps<AppTabParamList, "Groups">) => {
  const { theme } = useTheme();
  return (
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
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />
      <GroupStack.Screen
        name="Add Group"
        component={AddGroupScreen}
        options={{
          presentation: "modal",
          cardOverlayEnabled: false,
          cardStyle: {
            backgroundColor: theme.colors.grey5,
          },
          headerBackTitleVisible: false,
        }}
      />
    </GroupStack.Navigator>
  );
};

export default GroupScreen;
