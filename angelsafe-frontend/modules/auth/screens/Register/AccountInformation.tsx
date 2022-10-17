import React, { useState } from "react";
import { AuthRegisterParamList, AuthScreenProps } from "@/auth/types";
import { View, Image, StyleSheet } from "react-native";
import { useAppDispatch } from "@/shared/hooks";
import { login } from "@/shared/state/reducers/auth/actions";
import { Text, Button, Input } from "@rneui/themed";
import { buttomBottomPosition, StyleConstants } from "@/shared/styles";
import { Container } from "@/shared/components";
import { Controller, useForm } from "react-hook-form";
import { _API } from "@/shared/config";

type FieldsType = {
  username: string;
  password: string;
};

const RegisterScreen = ({
  navigation,
}: AuthScreenProps<AuthRegisterParamList, "Account Information">) => {
  const [passIsVisible, setPassIsVisible] = useState(false);

  const {
    control,
    formState: { errors, isSubmitting, touchedFields },
    handleSubmit,
  } = useForm<FieldsType>({
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onBlur",
  });

  const handleSubmitPressed = async (val: FieldsType) => {
    try {
      const response = await fetch(_API.AUTH.REGISTER_EMAIL, {
        body: JSON.stringify(val),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log({ data });
    } catch (e) {
      console.log({ e });
    }
    return;
    // return username;
    // navigation.push("Verify Email");
  };

  const handleShowPassword = () => {
    setPassIsVisible(!passIsVisible);
  };

  return (
    <Container
      type="keyboard"
      containerProps={{
        style: styles.wrapper,
      }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Create an Account to connect with those who share the same health
            struggles as you and gain support through groups, symptom tracking,
            and by sharing your wins and losses.
          </Text>
        </View>

        <View>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "This is a required field",
              // pattern: {
              //   message: "Please enter a valid email",
              //   value: emailRegex,
              // },
            }}
            render={({ field }) => {
              const hasErrors = !!errors.username ? styles.inputError : {};
              return (
                <Input
                  label="Enter Email Address:"
                  textContentType="emailAddress"
                  inputStyle={hasErrors}
                  containerStyle={styles.inputWrapper}
                  errorMessage={errors.username?.message}
                  {...field}
                  onChangeText={field.onChange}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Please enter a password",
            }}
            render={({ field }) => {
              const hasErrors = !!errors.password
                ? { ...styles.inputError, borderRightColor: "#fff" }
                : {};
              return (
                <Input
                  label="Confirm Password:"
                  textContentType="password"
                  secureTextEntry={passIsVisible}
                  inputStyle={[
                    {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    hasErrors,
                  ]}
                  rightIconContainerStyle={[
                    // {
                    //   backgroundColor: "#fff",
                    //   paddingVertical: 0,
                    //   marginVertical: 0,
                    //   height: StyleConstants.BUTTON_HEIGHT,
                    //   borderTopRightRadius: 10,
                    //   borderBottomRightRadius: 10,
                    //   paddingRight: 12,
                    // },
                    {
                      ...(!!errors.password
                        ? {
                            borderColor: "red",
                            borderWidth: 1,
                            borderLeftWidth: 0,
                          }
                        : {}),
                    },
                  ]}
                  rightIcon={{
                    type: "ionicon",
                    name: "eye-outline",
                    color: "#333",
                    onPress: handleShowPassword,
                  }}
                  errorMessage={errors.password?.message}
                  {...field}
                  onChangeText={field.onChange}
                />
              );
            }}
          />
        </View>
      </View>
      <Button
        title="Complete Account Setup"
        containerStyle={{ width: "100%" }}
        onPress={handleSubmit(handleSubmitPressed)}
      />
    </Container>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  image: {
    width: 180,
    height: 180,
  },
  textContainer: {
    justifyContent: "space-between",
    marginBottom: 40,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
