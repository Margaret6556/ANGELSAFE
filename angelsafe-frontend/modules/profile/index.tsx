import { createStackNavigator } from "@react-navigation/stack";
import { ProfileParamsList } from "./types";
import { EntryScreen } from "./screens";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/app";

const ProfileStack = createStackNavigator<ProfileParamsList>();

const GroupScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<TabParamList, "Profile">) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <ProfileStack.Screen
        name="Entry"
        component={EntryScreen}
        options={{
          header: () => null,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default GroupScreen;
