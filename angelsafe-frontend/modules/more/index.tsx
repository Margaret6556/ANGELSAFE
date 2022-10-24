import { createStackNavigator } from "@react-navigation/stack";
import { MoreParamsList } from "./types";
import { EntryScreen } from "./screens";
import { AppTabParamList } from "@/shared/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ChatScreen from "./screens/Chat";
import { TransitionScreen } from "@/shared/components";

const MoreStack = createStackNavigator<MoreParamsList>();

const GroupScreen = ({
  navigation,
}: BottomTabScreenProps<AppTabParamList, "More">) => {
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        ...TransitionScreen,
      }}
    >
      <MoreStack.Screen name="Entry" component={EntryScreen} />
      <MoreStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ header: () => null }}
      />
    </MoreStack.Navigator>
  );
};

export default GroupScreen;
