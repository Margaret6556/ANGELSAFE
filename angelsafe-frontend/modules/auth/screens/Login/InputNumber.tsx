import React, { useEffect, useRef, useState } from "react";
import { AuthLoginParamsList } from "@/auth/types";
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform,
} from "react-native";
import { Button, Text, makeStyles } from "@rneui/themed";
import { useForm } from "react-hook-form";
import NumberInput from "@/shared/components/NumberInput";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleConstants } from "@/shared/styles";
import useIsKeyboardShowing from "@/shared/hooks/useIsKeyboardShowing";

type FieldType = {
  mobile: string;
};
const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthLoginParamsList, "Input Number">) => {
  const styles = useStyles();
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const { keyboardIsShown, keyboardIsShowing } = useIsKeyboardShowing();
  const e = Platform.OS === "ios" ? keyboardIsShowing : keyboardIsShown;

  useEffect(() => {
    Animated.timing(buttonOpacity, {
      toValue: +!e,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [e]);

  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
  } = useForm<FieldType>({
    defaultValues: {
      mobile: "",
    },
  });

  const handleLogin = (val: FieldType) => {
    navigation.push("Verify Number", {
      mobileNumber: val.mobile,
    });
  };

  const handleLoginEmail = () => {
    navigation.push("Email Login");
  };

  return (
    <Pressable style={styles.wrapper} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.subtitle}>
          <Text h4 h4Style={styles.h4}>
            Welcome back
          </Text>
          <Text h4 h4Style={styles.h4}>
            you've been missed.
          </Text>
        </View>

        <NumberInput control={control} />
        <Animated.View style={{ opacity: buttonOpacity }}>
          <Text style={{ textAlign: "center", marginVertical: 24 }}>
            - or -
          </Text>
          <Button
            title="Login with email"
            type="outline"
            onPress={handleLoginEmail}
            disabled={e}
          />
        </Animated.View>
      </View>

      <KeyboardAvoidingView
        style={{
          width: "100%",
          marginBottom: 24,
        }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Button
          title="Login"
          onPress={handleSubmit(handleLogin)}
          loading={isSubmitting}
          disabled={!isDirty}
        />
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default LoginScreen;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  container: {},
  subtitle: {
    marginBottom: 72,
    width: "100%",
  },
  imageContainer: {
    position: "absolute",
    top: 12,
    right: 0,
    bottom: 0,
  },
  loginEmail: {
    minHeight: 200,
    justifyContent: "flex-start",
    marginBottom: 100,
  },
  image: {
    width: 210,
    height: 210,
  },
  inputs: {
    width: "100%",
  },
  remember: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "600",
  },
  h4: {
    color: theme.colors.primary,
  },
}));
