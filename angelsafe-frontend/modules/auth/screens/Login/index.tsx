import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { AuthLoginParamsList, AuthParamList } from "../../types";
import InputNumber from "./InputNumber";
import VerifyNumber from "./VerifyNumber";
import LoginEmail from "./LoginEmail";
import { TransitionOpacity } from "@/shared/components";
import { useTheme } from "@rneui/themed";

const AuthLoginStack = createStackNavigator<AuthLoginParamsList>();

const LoginScreens = ({}: StackScreenProps<AuthParamList, "Login">) => {
  return (
    <AuthLoginStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        ...TransitionOpacity,
        cardOverlayEnabled: false,
        headerBackTitleVisible: false,
        headerTitle: "Login",
      }}
    >
      <AuthLoginStack.Screen name="Input Number" component={InputNumber} />
      <AuthLoginStack.Screen name="Verify Number" component={VerifyNumber} />
      <AuthLoginStack.Screen name="Email Login" component={LoginEmail} />
    </AuthLoginStack.Navigator>
  );
};

export default LoginScreens;
