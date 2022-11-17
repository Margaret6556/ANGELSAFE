import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthLoginParamsList } from "@/auth/types";
import { Button, Image, Input, makeStyles } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useLoginMutation } from "@/shared/api/auth";
import { useLazyGetProfileQuery } from "@/shared/api/profile";
import emailRegex from "@/shared/utils/emailRegex";
import logger from "@/shared/utils/logger";
import useLoginFetchProfileStats from "@/shared/hooks/useLoginFetchProfileStats";
import { scale } from "react-native-size-matters";

type Props = {};

type FieldType = {
  email: string;
  password: string;
};

const LoginEmail = ({}: StackScreenProps<
  AuthLoginParamsList,
  "Email Login"
>) => {
  const [error, setError] = useState("");
  const [login, loginResponse] = useLoginMutation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [getProfile, getProfileResponse] = useLazyGetProfileQuery();
  const loginAndFetchProfile = useLoginFetchProfileStats();
  const styles = useStyles();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");

  const handleSetSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async (val: FieldType) => {
    try {
      const {
        data: { token },
        status,
      } = await login(val).unwrap();

      if (status === 200) {
        await loginAndFetchProfile(token);
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      setTimeout(() => {
        setError("");
      }, 8000);
      setError(err.data.message);
      setValue("password", "");
      logger("auth", err);
    }
  };
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={require("../../../../assets/auth/Saly-2.png")}
        style={styles.image}
        containerStyle={styles.imageContainer}
      />
      <View style={styles.inputs}>
        <Text style={{ color: "red", opacity: error ? 1 : 0, minHeight: 24 }}>
          {error}
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Invalid email",
            pattern: {
              value: emailRegex,
              message: "Please enter a valid email",
            },
          }}
          render={({ field }) => (
            <Input
              label="Email Address"
              errorMessage={errors.email?.message}
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCorrect={false}
              returnKeyType="next"
              {...field}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Please enter a password",
          }}
          render={({ field }) => {
            return (
              <Input
                label="Password"
                secureTextEntry={secureTextEntry}
                errorMessage={errors.password?.message}
                autoCapitalize="none"
                {...field}
                onChangeText={field.onChange}
                rightIcon={{
                  type: "ionicon",
                  name: secureTextEntry ? "eye-outline" : "eye-off-outline",
                  onPress: handleSetSecureText,
                  color: "#333",
                  size: scale(24),
                }}
                inputStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
            );
          }}
        />
      </View>
      <Button
        title="Login"
        containerStyle={{ width: "100%", marginBottom: 24 }}
        onPress={handleSubmit(handleLogin)}
        loading={loginResponse.isLoading || getProfileResponse.isLoading}
        disabled={!email || !password || !!Object.keys(errors).length}
      />
    </Pressable>
  );
};

export default LoginEmail;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    flex: 1,
  },
  inputs: {
    width: "100%",
    marginTop: theme.spacing.xl,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageContainer: {
    width: scale(200),
    height: scale(200),
    position: "absolute",
    right: 0,
  },
}));
