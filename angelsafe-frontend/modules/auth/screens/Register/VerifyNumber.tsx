import React from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { _API } from "@/shared/config";
import { StackScreenProps } from "@react-navigation/stack";
import OtpView from "@/auth/components/OtpView";

const VerifyNumber = ({
  navigation,
  route,
}: StackScreenProps<AuthRegisterParamList, "Verify Number">) => {
  const { mobileNumber: mobile } = route.params;

  const handleNavigate = () => {
    navigation.push("Sign Up");
  };

  return (
    <OtpView mobile={mobile} isLoginScreen={false} navigate={handleNavigate} />
  );
};

export default VerifyNumber;
