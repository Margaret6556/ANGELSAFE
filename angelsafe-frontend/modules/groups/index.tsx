import { createStackNavigator } from "@react-navigation/stack";
import { GroupParamsList } from "./types";
import { AddGroupScreen, EntryScreen, GroupDetailsScreen } from "./screens";
import { AppTabParamList } from "@/shared/types";
import { Header } from "./components";
import { SearchIcon, TransitionScreen } from "@/shared/components";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";

const GroupStack = createStackNavigator<GroupParamsList>();

const GroupScreen = ({
  navigation,
}: BottomTabScreenProps<AppTabParamList, "Groups">) => {
  return (
    <GroupStack.Navigator
      screenOptions={
        {
          // ...TransitionScreen,
        }
      }
    >
      <GroupStack.Screen
        name="Entry"
        component={EntryScreen}
        options={{ header: () => <Header /> }}
      />
      <GroupStack.Screen
        name="GroupDetails"
        component={GroupDetailsScreen}
        options={{
          ...TransitionScreen,
          headerTitle: "",
          headerBackTitleVisible: false,

          headerRight(props) {
            return <SearchIcon />;
          },
        }}
      />
      <GroupStack.Screen
        name="Add Group"
        component={AddGroupScreen}
        options={{
          presentation: "modal",
          cardOverlayEnabled: false,
          cardStyle: {
            backgroundColor: "#efefef",
          },
        }}
      />
    </GroupStack.Navigator>
  );
};

export default GroupScreen;
