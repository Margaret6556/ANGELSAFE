import { createStackNavigator } from "@react-navigation/stack";
import { MoreParamsList } from "./types";
import { EntryScreen } from "./screens";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/app";

const MoreStack = createStackNavigator<MoreParamsList>();

const GroupScreen = ({
  navigation,
}: NativeStackScreenProps<TabParamList, "More">) => {
  return (
    <MoreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <MoreStack.Screen name="Entry" component={EntryScreen} />
    </MoreStack.Navigator>
  );
};

export default GroupScreen;
