import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen, EntryScreen } from "./screens";
import { AuthParamList } from "./types";
import { TransitionSlide } from "@/shared/components";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthScreens = () => (
  <AuthStack.Navigator
    initialRouteName="Entry"
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
        ...TransitionSlide,
        header: () => null,
      }}
    />
    <AuthStack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerShown: false,
        ...TransitionSlide,
      }}
    />
  </AuthStack.Navigator>
);

export default AuthScreens;
