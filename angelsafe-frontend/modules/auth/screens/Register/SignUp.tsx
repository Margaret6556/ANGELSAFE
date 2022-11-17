import React, { useEffect, useRef, useState } from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, StyleSheet, Keyboard, Animated, Dimensions } from "react-native";
import { useKeyboardShowing } from "@/shared/hooks";
import { Text, Button, Input, makeStyles, useTheme, Icon } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { Stepper } from "@/auth/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { setUser } from "@/shared/state/reducers/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useRegisterProfileMutation,
  ProfileRegisterType,
} from "@/shared/api/profile";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import DropDownInput from "@/shared/components/DropDownInput";
import _countries from "@/shared/config/countries";
import logger from "@/shared/utils/logger";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

const mappedCountries = _countries.map((c) => ({
  label: c,
  value: c,
}));

type FormFields = ProfileRegisterType;

const SignUp = ({
  navigation,
}: StackScreenProps<AuthRegisterParamList, "Sign Up">) => {
  const [_error, setError] = useState("");
  const { keyboardIsShowing } = useKeyboardShowing();
  const value = useRef(new Animated.Value(0)).current;
  const [registerProfile, profileResponse] = useRegisterProfileMutation();
  const dispatch = useDispatch();
  const styles = useStyles();

  const [genderListOpen, setGenderListOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genders] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);
  const [countriesListOpen, setCountriesListOpen] = useState(false);
  const [countryValue, setCountryValue] = useState(null);
  const [countries] = useState(mappedCountries);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      username: "",
      year: "",
      gender: "Male",
      country: "",
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
        dispatch(
          setUser({
            username: val.username,
            country: val.country,
            gender: val.gender,
            year: val.year,
          })
        );
        navigation.navigate("Account Created");
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      setError(err.data.message);
      logger("auth", err);
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
        // scrollEnabled={keyboardIsShowing}
        contentContainerStyle={{
          justifyContent: "space-between",
          flex: 1,
          alignItems: "flex-start",
        }}
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
                fontSize: sizing.FONT.sm,
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
                  size: moderateScale(32),
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
            rules={{
              required: "Please enter birth year",
              minLength: {
                message: "Invalid input",
                value: 4,
              },
              min: {
                value: 1900,
                message: "Invalid input",
              },
              pattern: {
                value: /[0-9]+/,
                message: "Only numbers allowed",
              },
            }}
            render={({ field }) => (
              <Input
                leftIcon={{
                  name: "calendar",
                  type: "entypo",
                  color: "#546AF1",
                  size: moderateScale(32),
                }}
                keyboardType="number-pad"
                label="What year were you born?"
                inputStyle={styles.input}
                maxLength={4}
                errorMessage={errors.year?.message}
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            rules={{
              required: "Please select a country",
            }}
            render={({ field }) => (
              <DropDownInput
                errorMessage={errors.country?.message}
                listMode="MODAL"
                modalTitle="Select a country"
                open={countriesListOpen}
                value={countryValue}
                items={countries}
                setOpen={setCountriesListOpen}
                setValue={setCountryValue}
                onChangeValue={field.onChange}
                searchable
                iconProps={{
                  name: "location-pin",
                  type: "entypo",
                }}
                title="What country are you from?"
                placeholder="Select a country"
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            rules={{
              required: "Please choose a gender",
            }}
            render={({ field }) => (
              <DropDownInput
                errorMessage={errors.gender?.message}
                open={genderListOpen}
                value={genderValue}
                items={genders}
                setOpen={setGenderListOpen}
                setValue={setGenderValue}
                onChangeValue={field.onChange}
                iconProps={{
                  name: "male-female",
                  type: "foundation",
                }}
                title="What is your gender?"
                placeholder="Choose a gender"
              />
            )}
          />
        </View>
        <Button
          title="Sign Up"
          onPress={handleSubmit(handleSignUp)}
          disabled={!!Object.keys(errors).length}
          loading={profileResponse.isLoading}
          containerStyle={{ width: "100%" }}
        />
      </KeyboardAwareScrollView>
    </Animated.View>
  );
};

export default SignUp;

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  image: {
    width: moderateScale(180),
    height: moderateScale(180),
  },
  viewInput: {
    width: "100%",
  },
  input: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  text: {},
  subtitleh4: { color: theme.colors.primary, marginBottom: theme.spacing.lg },
  subtitle: {
    fontSize: sizing.FONT.sm,
    color: "#333",
  },
}));
