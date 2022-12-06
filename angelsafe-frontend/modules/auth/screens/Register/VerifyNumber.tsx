import React, { useEffect } from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { _API } from "@/shared/config";
import { StackScreenProps } from "@react-navigation/stack";
import OtpView from "@/auth/components/OtpView";
import { useResendOtpMutation } from "@/shared/api/auth";
import { Loading } from "@/shared/components";
import logger from "@/shared/utils/logger";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";

const VerifyNumber = ({
  navigation,
  route,
}: StackScreenProps<AuthRegisterParamList, "Verify Number">) => {
  const { mobileNumber: mobile } = route.params;
  const [requestOtp, requestOtpResponse] = useResendOtpMutation();

  // temp OTP fix
  useEffect(() => {
    const getOtp = async () => {
      try {
        await requestOtp({ mobileNumber: mobile }).unwrap();
      } catch (e) {
        const err = e as BackendResponse<BackendErrorResponse>;
        logger("auth", err);
      }
    };

    getOtp();
  }, []);

  const handleNavigate = () => {
    navigation.push("Sign Up");
  };

  if (requestOtpResponse.isLoading) {
    return <Loading />;
  }

  if (requestOtpResponse.data) {
    return (
      <OtpView
        mobile={mobile}
        isLoginScreen={false}
        navigate={handleNavigate}
      />
    );
  }

  return null;
};

export default VerifyNumber;
