import React from "react";
import { StyleSheet } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { _API } from "@/shared/config";

type Props = {
  onCodeComplete: (val: string) => void;
  error?: string;
};

const OtpInput = (props: Props) => {
  const handleOtp = (code: string) => {
    props.onCodeComplete(code);
  };

  const hasErrors = props.error
    ? {
        borderColor: "red",
      }
    : {};

  return (
    <OTPInputView
      style={styles.container}
      pinCount={6}
      autoFocusOnLoad
      codeInputFieldStyle={{ ...styles.borderStyleBase, ...hasErrors }}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      onCodeFilled={handleOtp}
    />
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    height: 100,
  },
  borderStyleBase: {
    width: 36,
    height: 50,
    borderRadius: 8,
    borderColor: "#44517C",
    backgroundColor: "#fff",
    color: "#44517C",
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#44517C",
  },
});
