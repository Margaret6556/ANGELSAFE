import {
  createStackNavigator,
  StackHeaderProps,
  StackScreenProps,
} from "@react-navigation/stack";
import { AuthLoginParamsList, AuthParamList } from "../../types";
import { Stepper } from "../../components";
import InputNumber from "./InputNumber";
import VerifyNumber from "./VerifyNumber";
import LoginEmail from "./LoginEmail";
import { TransitionOpacity } from "@/shared/components";
import { useTheme } from "@rneui/themed";

const AuthLoginStack = createStackNavigator<AuthLoginParamsList>();

const LoginScreens = ({}: StackScreenProps<AuthParamList, "Login">) => {
  const { theme } = useTheme();
  return (
    <AuthLoginStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        ...TransitionOpacity,
        cardOverlayEnabled: false,
        headerBackTitle: "",
        headerBackTitleVisible: false,
        headerTitle: "Login",
        headerTintColor: theme.colors.primary,
      }}
    >
      <AuthLoginStack.Screen name="Input Number" component={InputNumber} />
      <AuthLoginStack.Screen name="Verify Number" component={VerifyNumber} />
      <AuthLoginStack.Screen name="Email Login" component={LoginEmail} />
    </AuthLoginStack.Navigator>
  );
};

export default LoginScreens;
