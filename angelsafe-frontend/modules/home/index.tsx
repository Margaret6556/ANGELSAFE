import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamsList } from "./types";
import { EntryScreen } from "./screens/";
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
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
