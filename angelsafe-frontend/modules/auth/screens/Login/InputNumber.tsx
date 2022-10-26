import React, { useEffect, useRef, useState } from "react";
import { AuthLoginParamsList } from "@/auth/types";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { Button, Image, Text, Input, CheckBox } from "@rneui/themed";
import { useForm } from "react-hook-form";
import NumberInput from "@/shared/components/NumberInput";
import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";
import DropDownPicker from "react-native-dropdown-picker";
import countries from "@/shared/config/countries";
import LoginEmail from "./LoginEmail";

type FieldType = {
  mobile: string;
};
const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthLoginParamsList, "Input Number">) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(countries);

  const {
    control,
    formState: { errors, isSubmitting },
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
    <KeyboardAwareScrollView
      contentContainerStyle={styles.wrapper}
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View style={styles.subtitle}>
          <Text h4>Welcome back</Text>
          <Text h4>you've been missed.</Text>
        </View>

        <NumberInput control={control} />
        <Text style={{ textAlign: "center", marginVertical: 24 }}>- or -</Text>
        <Button
          title="Login with email"
          type="outline"
          onPress={handleLoginEmail}
        />
      </View>

      {/* <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          listMode="MODAL"
        />
      </View> */}
      <Button
        title="Login"
        onPress={handleSubmit(handleLogin)}
        loading={isSubmitting}
        containerStyle={{ marginBottom: 24 }}
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
    // backgroundColor: "hsla(360, 80%, 40%, 0.2)",
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
});
