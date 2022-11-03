import { createStackNavigator } from "@react-navigation/stack";
import { ProfileParamsList } from "./types";
import { EntryScreen } from "./screens";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppTabParamList } from "@/shared/types";
import EditProfile from "./screens/EditProfile";
import { TransitionSlide } from "@/shared/components";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";

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
        ...TransitionSlide,
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
          headerStyle: {},
          // header: () => null,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default GroupScreen;