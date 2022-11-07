import { createStackNavigator } from "@react-navigation/stack";
import { MoreParamsList } from "./types";
import { EntryScreen } from "./screens";
import { AppTabParamList } from "@/shared/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ChatScreen from "./screens/Chat";
import { TransitionSlide } from "@/shared/components";
import AccountSecurity from "./screens/AccountSecurity";
import { useTheme } from "@rneui/themed";
import Accessibility from "./screens/Accessibility";

const MoreStack = createStackNavigator<MoreParamsList>();

const GroupScreen = ({}: BottomTabScreenProps<AppTabParamList, "More">) => {
  const { theme } = useTheme();
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        ...TransitionSlide,
      }}
    >
      <MoreStack.Screen
        name="Entry"
        component={EntryScreen}
        options={{
          headerTitle: "More",
          headerTintColor: theme.colors.primary,
        }}
      />
      <MoreStack.Screen
        name="Account Security"
        component={AccountSecurity}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: theme.colors.primary,
        }}
      />
      <MoreStack.Screen
        name="Accessibility"
        component={Accessibility}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: theme.colors.primary,
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
