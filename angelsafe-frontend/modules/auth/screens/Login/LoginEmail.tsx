import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthLoginParamsList, AuthParamList } from "@/auth/types";
import { Button, Input } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useLoginMutation } from "@/shared/api/auth";
import { useAppDispatch } from "@/shared/hooks";
import { setLoggedIn, setUser } from "@/shared/state/reducers/auth";
import { useLazyGetProfileQuery } from "@/shared/api/profile";
import { Auth } from "@/shared/config";
import { setItemAsync } from "expo-secure-store";

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
  const dispatch = useAppDispatch();
  const [getProfile, getProfileResponse] = useLazyGetProfileQuery();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        const { data } = await getProfile(`Bearer ${token}`).unwrap();

        dispatch(setUser({ ...data, token }));
        await setItemAsync(Auth.KEY, token);
        dispatch(setLoggedIn(true));
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      console.log({ err });
      setTimeout(() => {
        setError("");
      }, 6000);
      setError(err.data.message);
    }
  };
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.inputs}>
        <Text style={{ color: "red", opacity: error ? 1 : 0, minHeight: 24 }}>
          {error}
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Invalid email",
          }}
          render={({ field }) => (
            <Input
              label="Email Address"
              errorMessage={errors.email?.message}
              autoCapitalize="none"
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
          render={({ field }) => (
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
              }}
              inputStyle={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
          )}
        />
      </View>
      <Button
        title="Login"
        containerStyle={{ width: "100%", marginBottom: 24 }}
        onPress={handleSubmit(handleLogin)}
        loading={loginResponse.isLoading || getProfileResponse.isLoading}
      />
    </Pressable>
  );
};

export default LoginEmail;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
    flex: 1,
  },
  inputs: {
    width: "100%",
  },
});
