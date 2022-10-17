import React, { useState } from "react";
import { AuthLoginParamsList } from "@/auth/types";
import { View, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { Text, Button, Icon } from "@rneui/themed";
import { Container } from "@/shared/components";
import { OtpInput } from "@/auth/components";
import { _API } from "@/shared/config";
import { StackScreenProps } from "@react-navigation/stack";
import { login, resetOTP } from "@/shared/utils/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "@/shared/state/reducers/auth";

const VerifyNumber = ({
  navigation,
  route,
}: StackScreenProps<AuthLoginParamsList, "Verify Number">) => {
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpResent, setOtpResent] = useState(false);
  const dispatch = useDispatch();

  const handleShowError = (e: string) => {
    setTimeout(() => {
      setError("");
    }, 5000);
    setError(e);
    setOtpCode("");
  };

  const handleOtpComplete = (val: string) => {
    setOtpCode(val);
  };

  const handleVerify = async () => {
    const { mobileNumber: mobile } = route.params;
    setIsLoading(true);
    try {
      const body = {
        mobile,
        otp: otpCode,
      };
      console.log("from login: ", body);
      const res = await login(body);
      if (res && res.status === 200) {
        dispatch(
          setUser({
            mobile,
          })
        );
        dispatch(setLoggedIn(true));
      }
    } catch (e) {
      if (typeof e === "string") {
        handleShowError(e);
      }
    }
    setIsLoading(false);
  };

  const handleResetOtp = async () => {
    const { mobileNumber: mobile } = route.params;
    try {
      const res = await resetOTP(mobile);
      if (res) {
        setTimeout(() => {
          setOtpResent(false);
        }, 4000);
        setOtpResent(true);
      }
    } catch (e) {
      if (typeof e === "string") {
        handleShowError(e);
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        <Icon
          type="foundation"
          name="lock"
          containerStyle={styles.lockContainer}
          iconProps={{ name: "lock", size: 64, color: "#fff" }}
        />
        <View style={styles.otp}>
          {!error ? (
            <View>
              <Text h4 style={styles.textTitle}>
                Enter One Time Password (OTP)
              </Text>
              <Text style={styles.subtitle}>
                One time password has been sent to your mobile number.
              </Text>
            </View>
          ) : (
            <View>
              <Text h4 style={[styles.textTitle, { color: "red" }]}>
                {error}
              </Text>
              <Text style={[styles.subtitle, { color: "red" }]}>
                Please try again
              </Text>
            </View>
          )}
          <OtpInput onCodeComplete={handleOtpComplete} error={error} />
          {!error && (
            <>
              {!otpResent ? (
                <Text style={{ textAlign: "center" }}>
                  Didn't receive OTP?{" "}
                  <Text style={{ color: "blue" }} onPress={handleResetOtp}>
                    Resend OTP
                  </Text>
                </Text>
              ) : (
                <Text style={{ textAlign: "center" }}>OTP Resent!</Text>
              )}
            </>
          )}
        </View>
      </View>

      <View style={[styles.button]}>
        <Button
          title="Verify"
          disabled={!otpCode}
          onPress={handleVerify}
          loading={isLoading}
        />
        <Text style={[styles.subtitle, { textAlign: "center" }]}>
          One time password will expire in 10 mins.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VerifyNumber;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    padding: StyleConstants.PADDING_HORIZONTAL,
    flex: 1,
  },
  container: {
    alignItems: "center",
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
  otp: {},
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
