import { StyleSheet, View, TextInput, Pressable, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Text, useTheme } from "@rneui/themed";

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
  const { theme } = useTheme();

  const styles = makeStyles({
    primary: isError ? theme.colors.error : theme.colors.primary,
    secondary: isError ? "hsla(0, 60%, 50%, 0.2)" : "hsla(200, 60%, 70%, 0.4)",
  });

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

const makeStyles = (theme: { [key: string]: any }) =>
  StyleSheet.create({
    container: {},
    otpContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
      alignSelf: "center",
      // width: "10%",
    },
    input: {
      height: 1,
      width: 1,
      opacity: 0,
    },
    otpInputBoxFocused: {
      backgroundColor: theme.secondary,
    },
    otpInputBox: {
      borderColor: theme.primary,
      borderRadius: 5,
      borderWidth: 1,
      width: 35,
      height: 46,
      justifyContent: "center",
      alignItems: "center",
    },
    otpInputText: {
      fontSize: 20,
      color: theme.primary,
    },
  });
