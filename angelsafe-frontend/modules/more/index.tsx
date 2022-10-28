import { createStackNavigator } from "@react-navigation/stack";
import { MoreParamsList } from "./types";
import { EntryScreen } from "./screens";
import { AppTabParamList } from "@/shared/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ChatScreen from "./screens/Chat";
import { TransitionSlide } from "@/shared/components";
import AccountSecurity from "./screens/AccountSecurity";

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
        ...TransitionSlide,
      }}
    >
      <MoreStack.Screen name="Entry" component={EntryScreen} />
      <MoreStack.Screen
        name="Account Security"
        component={AccountSecurity}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <MoreStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ header: () => null }}
      />
    </MoreStack.Navigator>
  );
};

export default GroupScreen;
