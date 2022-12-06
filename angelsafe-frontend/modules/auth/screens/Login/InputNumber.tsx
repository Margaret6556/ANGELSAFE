import React, { useEffect, useRef } from "react";
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
      <View>
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
          <Text style={styles.or}>- or -</Text>
          <Button
            title="Login with email"
            type="outline"
            onPress={handleLoginEmail}
            disabled={e}
          />
        </Animated.View>
      </View>

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  subtitle: {
    marginBottom: theme.spacing.xl * 1.5,
    width: "100%",
  },
  h4: {
    color: theme.colors.primary,
  },
  or: { textAlign: "center", marginVertical: theme.spacing.xl },
}));
