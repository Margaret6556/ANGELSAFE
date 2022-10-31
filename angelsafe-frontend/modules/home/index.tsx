import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamsList } from "./types";
import { EntryScreen, AddNewSymptom } from "./screens/";
import { AppTabParamList } from "@/shared/types";
import { useAppSelector } from "@/shared/hooks";
import { useEffect } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

const HomeStack = createStackNavigator<HomeParamsList>();

const HomeScreen = ({
  navigation,
}: BottomTabScreenProps<AppTabParamList, "Home">) => {
  const { redirectToGroup } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (redirectToGroup) {
      navigation.navigate("Groups");
    }
  }, []);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <HomeStack.Screen
        name="Entry"
        component={EntryScreen}
        options={{
          header: () => null,
        }}
      />
      <HomeStack.Screen
        name="Add New Symptom"
        component={AddNewSymptom}
        options={{
          header: () => null,
          presentation: "modal",
          cardOverlayEnabled: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
