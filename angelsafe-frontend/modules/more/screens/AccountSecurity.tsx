import { Alert, View } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { MoreParamsList } from "../types";
import {
  Button,
  Divider,
  Input,
  makeStyles,
  Text,
  useTheme,
} from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useRegisterEmailMutation } from "@/shared/api/auth";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { setUser } from "@/shared/state/reducers/auth";
import useDarkMode from "@/shared/hooks/useDarkMode";
import logger from "@/shared/utils/logger";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";

type FormType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const AccountSecurity = ({
  navigation,
}: StackScreenProps<MoreParamsList, "Account Security">) => {
  const [error, setError] = useState("");
  const [registerEmail, regEmailResponse] = useRegisterEmailMutation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const isDark = useDarkMode();
  const styles = useStyles({ isDark });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      email: user?.email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSetSecureText = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleAddLoginMethod = async (val: FormType) => {
    try {
      const {
        data: { email },
        status,
      } = await registerEmail(val).unwrap();
      if (status === 200) {
        dispatch(setUser({ email }));
        Alert.alert(
          "A verification email will be sent to your provided email.",
          undefined,
          [
            {
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("more", err);
      setTimeout(() => {
        setError("");
      }, 5000);
      setError(err.data.message);
    }
  };

  const password = watch("password");

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        {!user?.email && <Text h4>Add Login Method</Text>}
        <View style={{ marginVertical: 24 }}>
          {!user?.email && (
            <Text style={{ marginBottom: 24 }}>
              Enter your email and password to use as alternate login method.
            </Text>
          )}
          <Input
            label="Mobile Number"
            disabled
            placeholder={user?.mobileNumber}
            labelStyle={styles.label}
            placeholderTextColor={theme.colors.grey1}
            disabledInputStyle={{
              color: theme.colors.black,
              backgroundColor: theme.colors.grey4,
            }}
          />
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
                placeholder={user?.email}
                labelStyle={styles.label}
                placeholderTextColor={
                  isDark ? theme.colors.black : theme.colors.white
                }
                disabledInputStyle={{
                  color: theme.colors.black,
                  backgroundColor: theme.colors.grey4,
                }}
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />
          {user?.email && (
            <Divider style={{ marginTop: 12, marginBottom: 24 }} />
          )}
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Please enter a password",
            }}
            render={({ field }) => (
              <Input
                label={!user?.email ? "Password" : "Change Password"}
                secureTextEntry={secureTextEntry}
                errorMessage={errors.password?.message}
                autoCapitalize="none"
                {...field}
                onChangeText={field.onChange}
                rightIcon={{
                  type: "ionicon",
                  name: secureTextEntry ? "eye-outline" : "eye-off-outline",
                  onPress: handleSetSecureText,
                }}
                labelStyle={styles.label}
                inputStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  color: isDark ? theme.colors.white : theme.colors.black,
                }}
                textContentType="password"
              />
            )}
          />
          {user?.email && (
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: !!user.email,
                validate: (val) =>
                  val === password ? true : "Password do not match",
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Confirm password"
                  secureTextEntry={secureTextEntry}
                  errorMessage={error?.message}
                  autoCapitalize="none"
                  textContentType="password"
                  {...field}
                  rightIcon={{
                    type: "ionicon",
                    name: secureTextEntry ? "eye-outline" : "eye-off-outline",
                    onPress: handleSetSecureText,
                  }}
                  labelStyle={styles.label}
                  inputStyle={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    color: isDark ? theme.colors.white : theme.colors.black,
                  }}
                  onChangeText={field.onChange}
                />
              )}
            />
          )}
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
    </KeyboardAwareScrollView>
  );
};

export default AccountSecurity;

const useStyles = makeStyles((theme, props: { isDark: boolean }) => ({
  container: {
    justifyContent: "space-between",
    paddingVertical: StyleConstants.PADDING_VERTICAL,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
  label: {
    color: props.isDark ? theme.colors.black : theme.colors.primary,
  },
  wrapper: {
    width: "100%",
  },
}));
