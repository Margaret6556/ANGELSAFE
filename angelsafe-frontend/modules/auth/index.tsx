import { TabParamList } from "@/app";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen, EntryScreen } from "./screens";
import { AuthParamList } from "./types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { TransitionScreen } from "@/shared/components";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthScreens = ({
  navigation,
  route,
}: BottomTabScreenProps<TabParamList, "Auth">) => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "transparent",
      },
    }}
  >
    <AuthStack.Screen
      name="Entry"
      component={EntryScreen}
      options={{
        header: () => null,
      }}
    />
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        ...TransitionScreen,
        header: () => null,
      }}
    />
    <AuthStack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerShown: false,
        ...TransitionScreen,
      }}
    />
  </AuthStack.Navigator>
);

export default AuthScreens;
