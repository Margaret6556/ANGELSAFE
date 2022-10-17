import {
  createStackNavigator,
  StackHeaderProps,
  StackScreenProps,
} from "@react-navigation/stack";
import { AuthParamList, AuthRegisterParamList } from "../../types";
import CreateAccount from "./CreateAccount";
import AccountInformation from "./AccountInformationMobile";
import VerifyNumber from "./VerifyNumber";
import SignUp from "./SignUp";
import AccountCreated from "./AccountCreated";
import { Stepper } from "../../components/";
import { NullHeader } from "@/shared/components";

const AuthRegisterStack = createStackNavigator<AuthRegisterParamList>();

const RegisterScreens = ({}: StackScreenProps<AuthParamList, "Register">) => {
  return (
    <AuthRegisterStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        animationEnabled: false,
        cardOverlayEnabled: false,
        header: ({ navigation, route }) => {
          const { index } = navigation.getState();
          return (
            <Stepper
              current={index}
              title={route.name === "Account Created" ? "" : route.name}
            />
          );
        },
      }}
    >
      <AuthRegisterStack.Screen
        name="Create an Account"
        component={CreateAccount}
        options={{
          header: ({ route }) => <NullHeader title={route.name} />,
        }}
      />
      <AuthRegisterStack.Screen
        name="Account Information"
        component={AccountInformation}
      />
      <AuthRegisterStack.Screen name="Verify Number" component={VerifyNumber} />
      <AuthRegisterStack.Screen name="Sign Up" component={SignUp} />
      <AuthRegisterStack.Screen
        name="Account Created"
        component={AccountCreated}
        options={{
          headerStyle: { display: "none" },
        }}
      />
    </AuthRegisterStack.Navigator>
  );
};

export default RegisterScreens;
