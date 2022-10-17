import React, { useState } from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, StyleSheet } from "react-native";
import { useAppDispatch } from "@/shared/hooks";
import { Text, Button, Icon } from "@rneui/themed";
import { Container } from "@/shared/components";
import { OtpInput } from "@/auth/components";
import { _API } from "@/shared/config";
import { StackScreenProps } from "@react-navigation/stack";
import { login, resetOTP } from "@/shared/utils/auth";
import { setUser } from "@/shared/state/reducers/auth";

const VerifyNumber = ({
  navigation,
  route,
}: StackScreenProps<AuthRegisterParamList, "Verify Number">) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [otpResent, setOtpResent] = useState(false);
  const dispatch = useAppDispatch();

  const handleOtpComplete = (val: string) => {
    setOtpCode(val);
  };

  const handleShowError = (e: string) => {
    setTimeout(() => {
      setError("");
    }, 5000);
    setError(e);
    setOtpCode("");
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const { mobileNumber: mobile } = route.params;
      const body = {
        mobile,
        otp: otpCode,
      };
      console.log("from register: ", body);
      const res = await login(body);
      if (res && res.status === 200) {
        dispatch(
          setUser({
            mobile,
          })
        );
      }
      navigation.push("Sign Up");
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
    <Container type="keyboard" containerProps={{ style: styles.wrapper }}>
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
          // disabled={!otpCode}
          onPress={handleVerify}
          loading={isLoading}
        />
        <Text style={[styles.subtitle, { textAlign: "center" }]}>
          One time password will expire in 10 mins.
        </Text>
      </View>
    </Container>
  );
};

export default VerifyNumber;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
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
