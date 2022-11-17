import { StyleSheet, View, TextInput, Pressable, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

interface IOtpInputFieldProps {
  isError: boolean;
  onComplete: (code: string) => void;
}

const maxLength = 6;
const OtpInputField = ({ isError, onComplete }: IOtpInputFieldProps) => {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState("");
  const textInputRef = useRef<TextInput>(null);
  const [_inputContainerIsFocused, setInputContainerIsFocused] =
    useState(false);
  const styles = useStyles({ isError });

  const codeDigitsArray = new Array(maxLength).fill(0);

  const handleChangeText = (text: string) => {
    setCode(text);
  };

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    if (code.length === maxLength) {
      Keyboard.dismiss();
      onComplete(code);
    }
  }, [code.length]);

  useEffect(() => {
    return () => {
      if (isError) {
        setCode("");
      }
    };
  }, [isError]);

  const toCodeDigitInput = (_value: string, index: number) => {
    const emptyInputCHar = " ";
    const digit = code[index] || emptyInputCHar;

    const isCurrent = index === code.length;

    return (
      <View
        key={index}
        style={
          isCurrent
            ? [styles.otpInputBox, styles.otpInputBoxFocused]
            : styles.otpInputBox
        }
      >
        <Text style={styles.otpInputText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleOnPress} style={styles.otpContainer}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        ref={textInputRef}
        maxLength={maxLength}
        value={code}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        onBlur={handleOnBlur}
        style={styles.input}
      />
    </View>
  );
};

export default OtpInputField;

const useStyles = makeStyles((theme, props: { isError: boolean }) => ({
  container: {},
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  input: {
    height: 1,
    width: 1,
    opacity: 0,
  },
  otpInputBoxFocused: {
    backgroundColor: props.isError
      ? theme.colors.error
      : theme.colors.secondary,
  },
  otpInputBox: {
    borderColor: props.isError ? theme.colors.error : theme.colors.primary,
    borderRadius: sizing.BORDER_RADIUS,
    borderWidth: 1,
    width: moderateScale(35),
    height: moderateScale(46),
    justifyContent: "center",
    alignItems: "center",
  },
  otpInputText: {
    fontSize: sizing.FONT.lg,
    color: props.isError ? theme.colors.error : theme.colors.primary,
  },
}));
