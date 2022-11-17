import React, { useCallback, useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { Text, Button, Icon, makeStyles } from "@rneui/themed";
import { Auth, _API } from "@/shared/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "@/shared/state/reducers/auth";
import { useLoginMutation, useResendOtpMutation } from "@/shared/api/auth";
import { setItemAsync } from "expo-secure-store";
import OtpInputField from "@/shared/components/OtpInput";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useLazyGetProfileQuery } from "@/shared/api/profile";
import CountdownTimer from "../Countdown";
import logger from "@/shared/utils/logger";
import useLoginFetchProfileStats from "@/shared/hooks/useLoginFetchProfileStats";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";
import useIsKeyboardShowing from "@/shared/hooks/useIsKeyboardShowing";

interface IOtpViewProps {
  mobile: string;
  isLoginScreen?: boolean;
  navigate?: () => void;
}

const OtpView = ({ mobile, isLoginScreen = true, navigate }: IOtpViewProps) => {
  const [otpCode, setOtpCode] = useState("");
  const [otpResent, setOtpResent] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [login, loginRes] = useLoginMutation();
  const [resendOtp, otpResponse] = useResendOtpMutation();
  const [getProfile] = useLazyGetProfileQuery();
  const styles = useStyles();
  const dispatch = useDispatch();
  const loginAndFetchProfile = useLoginFetchProfileStats();
  const { keyboardIsShown } = useIsKeyboardShowing();

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
        if (isLoginScreen) {
          await loginAndFetchProfile(token);
        } else {
          dispatch(setUser({ token }));
          navigate && navigate();
        }
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      handleShowError(err.data.message);
      logger("auth", err);
    }
  };

  const handleOtpComplete = (val: string) => {
    setOtpCode(val);
  };

  const handleResetOtp = async () => {
    if (!errorMessage || !otpResponse.isLoading) {
      try {
        const { status } = await resendOtp({ mobileNumber: mobile }).unwrap();

        if (status === 200) {
          setTimeout(() => {
            setOtpResent(false);
            setOtpExpired(false);
          }, 4000);
          setOtpExpired(true);
          setOtpResent(true);
        }
      } catch (e) {
        const err = e as BackendResponse<BackendErrorResponse>;
        handleShowError(err.data.message);
        logger("auth", err);
      }
    }
  };

  const handleShowError = (e: string) => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
    setErrorMessage(e);
    setOtpCode("");
  };

  const handleCountdownComplete = useCallback((completed: boolean) => {
    setOtpExpired(completed);
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.wrapper}
      extraHeight={moderateScale(200)}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === "ios"}
    >
      <View style={styles.container}>
        <Icon
          type="foundation"
          name="lock"
          containerStyle={styles.lockContainer}
          iconProps={{ name: "lock", size: moderateScale(64), color: "#fff" }}
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
                isError={!!errorMessage}
              />
            </View>
            {!otpResent ? (
              <Text style={{ textAlign: "center" }}>
                Didn't receive OTP?{" "}
                {otpResponse.isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.textResendOtp} onPress={handleResetOtp}>
                    Resend OTP
                  </Text>
                )}
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

      <View
        style={[
          styles.button,
          Platform.OS === "android" && keyboardIsShown ? { opacity: 0 } : {},
        ]}
      >
        <Button
          title="Verify"
          disabled={!otpCode || otpExpired}
          onPress={handleVerify}
          loading={loginRes.isLoading}
        />
        <Text
          style={[
            styles.subtitle,
            {
              textAlign: "center",
              minHeight: 32,
              paddingTop: 8,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {otpExpired ? (
            <>OTP Expired</>
          ) : (
            <>
              One time password will expire in{" "}
              <CountdownTimer onComplete={handleCountdownComplete} />
            </>
          )}
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default OtpView;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    justifyContent: "space-between",
    padding: theme.spacing.lg,
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  lockContainer: {
    backgroundColor: theme.colors.primary,
    height: moderateScale(100),
    width: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginVertical: moderateScale(48),
  },
  otp: {
    // height: moderateScale(100),
    justifyContent: "space-between",
    width: "100%",
  },
  textTitle: {
    textAlign: "center",
  },
  textResendOtp: { color: theme.colors.primary },
  subtitle: {
    fontSize: sizing.FONT.sm,
    textAlign: "center",
  },
  button: {
    justifyContent: "flex-end",
    width: "100%",
    flex: 1,
  },
}));
