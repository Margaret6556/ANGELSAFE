import { createStackNavigator } from "@react-navigation/stack";
import { AlertParamsList } from "./types";
import { EntryScreen } from "./screens";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/app";
import Header from "./components/Header";

const AlertStack = createStackNavigator<AlertParamsList>();

const GroupScreen = ({
  navigation,
}: NativeStackScreenProps<TabParamList, "Alerts">) => {
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
