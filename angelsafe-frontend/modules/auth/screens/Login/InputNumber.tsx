import React, { useState } from "react";
import { AuthLoginParamsList } from "@/auth/types";
import { View, StyleSheet } from "react-native";
import { Button, Image, Text, Input, CheckBox } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch } from "@/shared/hooks";
import { login } from "@/shared/state/reducers/auth/actions";
import { useForm } from "react-hook-form";
import NumberInput from "@/shared/components/NumberInput";
import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";

type FieldType = {
  mobile: string;
};
const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthLoginParamsList, "Input Number">) => {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FieldType>({
    defaultValues: {
      mobile: "",
    },
  });

  const handleLogin = async (val: FieldType) => {
    navigation.push("Verify Number", {
      mobileNumber: val.mobile,
    });
  };

  // const handleCheckBoxPress = () => {
  //   setIsChecked(!isChecked);
  // };

  // const handleUsernameChange = (text: string) => {
  //   setUsername(text);
  // };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.wrapper}
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View style={styles.subtitle}>
          <Text h4>Welcome back</Text>
          <Text h4>you've been missed.</Text>
        </View>

        {/* <View style={styles.imageContainer}>
          <Image
            source={require("../../../../assets/auth/Saly-2.png")}
            resizeMode="contain"
            style={styles.image}
            containerStyle={styles.imageContainer}
          />
        </View> */}

        <NumberInput control={control} />

        {/* <View style={styles.inputs}>
          <Input
            label="Email Address or Username:"
            containerStyle={{ paddingHorizontal: 0 }}
            errorStyle={{
              color: "red",
            }}
            errorMessage="Test"
            value={username}
            onChangeText={handleUsernameChange}
          />
          <Input label="Password:" />
          <View style={styles.remember}>
            <CheckBox
              checked={isChecked}
              title="Remember Me"
              onPress={handleCheckBoxPress}
            />
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </View>
        </View> */}
      </View>
      <Button
        title="Login"
        containerStyle={{
          width: "100%",
        }}
        onPress={handleSubmit(handleLogin)}
        loading={isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  container: {
    width: "100%",
  },
  subtitle: {
    marginBottom: 72,
    width: "100%",
  },
  imageContainer: {
    position: "absolute",
    top: 12,
    right: 0,
    bottom: 0,
    // zIndex: -1,
  },
  numberInputContainer: {
    // justifyContent: "center",
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
});
