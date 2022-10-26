import { createStackNavigator } from "@react-navigation/stack";
import { ProfileParamsList } from "./types";
import { EntryScreen } from "./screens";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppTabParamList } from "@/shared/types";
import EditProfile from "./screens/EditProfile";
import { TransitionScreen } from "@/shared/components";

const ProfileStack = createStackNavigator<ProfileParamsList>();

const GroupScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<AppTabParamList, "Profile">) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        ...TransitionScreen,
      }}
    >
      <ProfileStack.Screen
        name="Entry"
        component={EntryScreen}
        options={{
          header: () => null,
        }}
      />
      <ProfileStack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#fff",
          },
          // header: () => null,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default GroupScreen;
