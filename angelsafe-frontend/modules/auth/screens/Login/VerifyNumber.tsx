import React from "react";
import { AuthLoginParamsList } from "@/auth/types";
import { _API } from "@/shared/config";
import { StackScreenProps } from "@react-navigation/stack";
import OtpView from "@/auth/components/OtpView";
import OtpInputField from "@/shared/components/OtpInput";

const VerifyNumber = ({
  navigation,
  route,
}: StackScreenProps<AuthLoginParamsList, "Verify Number">) => {
  const { mobileNumber } = route.params;

  return <OtpView mobile={mobileNumber} isLoginScreen />;
};

export default VerifyNumber;
