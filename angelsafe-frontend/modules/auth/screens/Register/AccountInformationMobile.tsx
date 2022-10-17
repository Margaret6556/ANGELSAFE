import React from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, Image, StyleSheet, Keyboard } from "react-native";
import { useAppDispatch } from "@/shared/hooks";
import { Text, Button, Input } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useForm } from "react-hook-form";
import { _API } from "@/shared/config";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { register } from "@/shared/utils/auth";
import NumberInput from "@/shared/components/NumberInput";
import { StackScreenProps } from "@react-navigation/stack";

type FieldType = {
  mobile: string;
};

const RegisterScreen = ({
  navigation,
}: StackScreenProps<AuthRegisterParamList, "Account Information">) => {
  // const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<FieldType>({
    defaultValues: {
      mobile: "",
    },
  });

  const handleSubmitPressed = async ({ mobile }: FieldType) => {
    try {
      navigation.navigate("Verify Number", {
        mobileNumber: mobile,
      });
      // const res = await register(mobile);
      // if (res) {
      //   navigation.navigate("Verify Number", {
      //     mobileNumber: res,
      //   });
      // }
    } catch (e) {
      if (typeof e === "string") {
        setError("mobile", { message: e });
      }
    }
  };

  return (
    <Container
      containerProps={{
        style: styles.wrapper,
      }}
    >
      <View style={{}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Create an Account to connect with those who share the same health
              struggles as you and gain support through groups, symptom
              tracking, and by sharing your wins and losses.
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <NumberInput control={control} />
      </View>

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        containerStyle={{
          minHeight: "35%",
          width: "100%",
        }}
      />
      <Button
        title="Complete Account Setup"
        containerStyle={{
          width: "100%",
          height: "20%",
          justifyContent: "flex-end",
        }}
        onPress={handleSubmit(handleSubmitPressed)}
        loading={isSubmitting}
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
  // inputContainer: {
  //   width: "100%",
  //   borderRadius: 10,
  //   padding: 0,
  // },
  // inputTextContainer: {
  //   borderTopRightRadius: 10,
  //   borderBottomRightRadius: 10,
  //   padding: 0,
  // },
  // inputError: {
  //   borderColor: "red",
  //   borderWidth: 1,
  // },
  // errorText: {
  //   textAlign: "right",
  //   color: "red",
  //   marginVertical: 4,
  //   fontSize: 12,
  // },
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
