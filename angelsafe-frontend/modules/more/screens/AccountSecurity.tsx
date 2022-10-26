import { Alert, Keyboard, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { MoreParamsList } from "../types";
import { Container } from "@/shared/components";
import { Button, Input, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useRegisterEmailMutation } from "@/shared/api/auth";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { setUser } from "@/shared/state/reducers/auth";

type FormType = {
  email: string;
  password: string;
};

const AccountSecurity = ({
  navigation,
}: StackScreenProps<MoreParamsList, "Account Security">) => {
  const [error, setError] = useState("");
  const [registerEmail, regEmailResponse] = useRegisterEmailMutation();
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: user?.email ?? "",
      password: "",
    },
  });

  const handleSetSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleAddLoginMethod = async (val: FormType) => {
    console.log({ val });
    try {
      const {
        data: { email },
        status,
      } = await registerEmail(val).unwrap();

      console.log({ email });

      if (status === 200) {
        dispatch(setUser({ email }));
        Alert.alert("Success", undefined, [
          {
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      console.log({ err });
      setTimeout(() => {
        setError("");
      }, 5000);
      setError(err.data.message);
    }
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <Container
        type="keyboard"
        containerProps={{ style: styles.container, behavior: "height" }}
      >
        <View style={styles.wrapper}>
          <Text h4>Add Login Method</Text>
          <View style={{ marginVertical: 24 }}>
            <Text style={{ marginBottom: 24 }}>
              Enter your email and password to use as alternate login method.
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Invalid email",
              }}
              render={({ field }) => (
                <Input
                  label="Email"
                  errorMessage={errors.email?.message}
                  autoCapitalize="none"
                  returnKeyType="next"
                  disabled={!!user?.email}
                  placeholder={"test@email.com"}
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
            {error && <Text style={{ color: "red" }}>{error}</Text>}
          </View>
        </View>
        <Button
          title="Submit"
          containerStyle={{ width: "100%" }}
          onPress={handleSubmit(handleAddLoginMethod)}
          loading={regEmailResponse.isLoading}
          disabled={!!Object.keys(errors).length}
        />
      </Container>
    </Pressable>
  );
};

export default AccountSecurity;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  wrapper: {
    width: "100%",
  },
});
