import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { Auth, _API } from "@/shared/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "@/shared/state/reducers/auth";
import { useLoginMutation, useResendOtpMutation } from "@/shared/api/auth";
import { setItemAsync } from "expo-secure-store";
import OtpInputField from "@/shared/components/OtpInput";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";

interface IOtpViewProps {
  mobile: string;
  isLoginScreen?: boolean;
  navigate?: () => void;
}

const OtpView = ({ mobile, isLoginScreen = true, navigate }: IOtpViewProps) => {
  const [otpCode, setOtpCode] = useState("");
  const [otpResent, setOtpResent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [login, loginRes] = useLoginMutation();
  const [resendOtp, otpResponse] = useResendOtpMutation();
  const dispatch = useDispatch();

  const handleVerify = async () => {
    try {
      const {
        status,
        data: { token },
      } = await login({
        mobile,
        otp: otpCode,
      }).unwrap();

      if (status === 200) {
        dispatch(setUser({ mobile, token }));
        await setItemAsync(Auth.KEY, token);
        if (isLoginScreen) {
          dispatch(setLoggedIn(true));
        } else {
          navigate && navigate();
        }
      }
    } catch (e) {
      console.log({ e });
      const err = e as BackendResponse<BackendErrorResponse>;
      handleShowError(err.data.message);
    }
  };

  const handleOtpComplete = (val: string) => {
    setOtpCode(val);
  };

  const handleResetOtp = async () => {
    try {
      const { status } = await resendOtp({ mobileNumber: mobile }).unwrap();

      if (status === 200) {
        setTimeout(() => {
          setOtpResent(false);
        }, 4000);

        setOtpResent(true);
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      handleShowError(err.data.message);
      console.log({ e });
    }
  };

  const handleShowError = (e: string) => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
    setErrorMessage(e);
    setOtpCode("");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.wrapper}
      extraHeight={240}
    >
      <View style={styles.container}>
        <Icon
          type="foundation"
          name="lock"
          containerStyle={styles.lockContainer}
          iconProps={{ name: "lock", size: 64, color: "#fff" }}
        />
        <View style={styles.otp}>
          {errorMessage ? (
            <View>
              <Text h4 style={[styles.textTitle, { color: "red" }]}></Text>
              <Text style={[styles.subtitle, { color: "red" }]}>
                {errorMessage}
              </Text>
            </View>
          ) : (
            <View>
              <Text h4 style={styles.textTitle}>
                Enter One Time Password (OTP)
              </Text>
              <Text style={styles.subtitle}>
                One time password has been sent to your mobile number.
              </Text>
            </View>
          )}
          <View>
            <View style={{ marginVertical: 12 }}>
              <OtpInputField
                onComplete={handleOtpComplete}
                isError={loginRes.isError || otpResponse.isError}
              />
            </View>
            {!otpResent ? (
              <Text style={{ textAlign: "center" }}>
                Didn't receive OTP?{" "}
                <Text style={{ color: "blue" }} onPress={handleResetOtp}>
                  Resend OTP
                </Text>
              </Text>
            ) : (
              <>
                {otpResponse.isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{ textAlign: "center" }}>OTP Resent!</Text>
                )}
              </>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.button]}>
        <Button
          title="Verify"
          disabled={!otpCode}
          onPress={handleVerify}
          loading={loginRes.isLoading}
        />
        <Text style={[styles.subtitle, { textAlign: "center" }]}>
          One time password will expire in 10 mins.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default OtpView;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    padding: StyleConstants.PADDING_HORIZONTAL,
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  lockContainer: {
    backgroundColor: "#0B2853",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 48,
  },
  otp: {
    height: 200,
    justifyContent: "space-between",
    width: "100%",
  },
  textTitle: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    justifyContent: "flex-end",
    width: "100%",
  },
});
