import React, { useEffect, useRef, useState } from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, Image, StyleSheet, Keyboard, Animated } from "react-native";
import { useAppDispatch, useKeyboardShowing } from "@/shared/hooks";
import { Text, Button, Input } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { Stepper } from "@/auth/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { setLoggedIn, setUser } from "@/shared/state/reducers/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ProfileRegisterType,
  useRegisterProfileMutation,
} from "@/shared/api/profile";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
// import { useRegisterMutation } from "@/shared/api/auth";

type FormFields = ProfileRegisterType;

const SignUp = ({
  navigation,
}: StackScreenProps<AuthRegisterParamList, "Sign Up">) => {
  const [_error, setError] = useState("");
  const { keyboardIsShowing } = useKeyboardShowing();
  const value = useRef(new Animated.Value(0)).current;
  const [registerProfile, profileResponse] = useRegisterProfileMutation();
  const dispatch = useDispatch();

  // const [register, registerResponse] = useRegisterMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      username: "",
      year: "2004",
      gender: "Male",
      country: "India",
    },
    reValidateMode: "onChange",
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: keyboardIsShowing ? -100 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [keyboardIsShowing]);

  useEffect(() => {
    navigation.setOptions({
      header: ({ navigation, route }) => {
        const { index } = navigation.getState();

        return (
          <Animated.View
            style={{
              transform: [
                {
                  translateY: value,
                },
              ],
            }}
          >
            <Stepper current={index} title={route.name} />
          </Animated.View>
        );
      },
    });
  }, []);

  const handleSignUp = async (val: FormFields) => {
    try {
      const { data, status } = await registerProfile(val).unwrap();

      if (status === 200) {
        console.log({ data });
        dispatch(
          setUser({
            username: val.username,
          })
        );
        navigation.navigate("Account Created");
      }
    } catch (e) {
      setError((e as BackendResponse<BackendErrorResponse>).data.message);
      console.log({ e });
    }
  };

  return (
    <Animated.View
      style={[
        {
          ...styles.container,
          paddingTop: keyboardIsShowing ? 0 : StyleConstants.PADDING_VERTICAL,
        },
        {
          transform: [{ translateY: value }],
        },
      ]}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={keyboardIsShowing}
      >
        <View style={styles.text}>
          <Text h4 h4Style={[styles.subtitle, styles.subtitleh4]}>
            Complete your AngelSafe Account
          </Text>
          <Text style={styles.subtitle}>
            The digital health and comunity platform made for you.
          </Text>
        </View>
        <View style={styles.viewInput}>
          {_error && (
            <Text
              style={{
                color: "red",
                fontSize: 14,
                marginTop: 12,
              }}
            >
              {_error}
            </Text>
          )}
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                leftIcon={{
                  name: "person",
                  type: "ionicon",
                  color: "#546AF1",
                }}
                label="Choose your username:"
                inputStyle={styles.input}
                autoCapitalize="none"
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="year"
            render={({ field }) => (
              <Input
                leftIcon={{
                  name: "calendar",
                  type: "entypo",
                  color: "#546AF1",
                }}
                keyboardType="number-pad"
                label="What year were you born?"
                inputStyle={styles.input}
                maxLength={4}
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Input
                leftIcon={{
                  name: "location-pin",
                  type: "entypo",
                  color: "#546AF1",
                }}
                label="What country are you from?"
                inputStyle={styles.input}
                autoCapitalize="none"
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Input
                leftIcon={{
                  name: "male-female",
                  type: "foundation",
                  color: "#546AF1",
                }}
                label="What is your gender?"
                inputStyle={styles.input}
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />
        </View>
        <View></View>
        <View style={styles.button}>
          <Button
            title="Sign Up"
            onPress={handleSubmit(handleSignUp)}
            disabled={!!Object.keys(errors).length}
            loading={profileResponse.isLoading}
          />
        </View>
      </KeyboardAwareScrollView>
    </Animated.View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
  button: {
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
  },
  viewInput: {
    width: "100%",
  },
  input: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  text: {
    // marginBottom: StyleConstants.PADDING_VERTICAL,
  },
  subtitleh4: { color: "#00116A", marginBottom: 12 },
  subtitle: {
    fontSize: 18,
    color: "#333",
  },
});
