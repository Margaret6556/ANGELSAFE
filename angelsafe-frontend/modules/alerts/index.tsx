import { createStackNavigator } from "@react-navigation/stack";
import { AlertParamsList } from "./types";
import { EntryScreen } from "./screens";
import Header from "./components/Header";
import { AppTabParamList } from "@/shared/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

const AlertStack = createStackNavigator<AlertParamsList>();

const GroupScreen = ({
  navigation,
}: BottomTabScreenProps<AppTabParamList, "Alerts">) => {
  return (
    <AlertStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <AlertStack.Screen name="Entry" component={EntryScreen} />
    </AlertStack.Navigator>
  );
};

export default GroupScreen;
