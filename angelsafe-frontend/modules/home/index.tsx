import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamsList } from "./types";
import { EntryScreen, AddNewSymptom } from "./screens/";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/app";
import { View } from "react-native";

const HomeStack = createStackNavigator<HomeParamsList>();

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<TabParamList, "Home">) => {
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
          // cardOverlay: ({ style }) => {
          //   return <View style={{ backgroundColor: "red" }}>{}</View>;
          // },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
