import {
  createStackNavigator,
  StackHeaderProps,
  StackScreenProps,
} from "@react-navigation/stack";
import { AuthLoginParamsList, AuthParamList } from "../../types";
import { Stepper } from "../../components";
// import { NullHeader } from "@/shared/components";
import InputNumber from "./InputNumber";
import VerifyNumber from "./VerifyNumber";

const AuthLoginStack = createStackNavigator<AuthLoginParamsList>();

const LoginScreens = ({}: StackScreenProps<AuthParamList, "Login">) => {
  return (
    <AuthLoginStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        animationEnabled: false,
        cardOverlayEnabled: false,
        headerBackTitle: "",
      }}
    >
      <AuthLoginStack.Screen name="Input Number" component={InputNumber} />
      <AuthLoginStack.Screen name="Verify Number" component={VerifyNumber} />
    </AuthLoginStack.Navigator>
  );
};

export default LoginScreens;
