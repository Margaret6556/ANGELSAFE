import React, { useEffect } from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, StyleSheet, Keyboard } from "react-native";
import { Text, Button, makeStyles } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useForm } from "react-hook-form";
import { _API } from "@/shared/config";
import NumberInput from "@/shared/components/NumberInput";
import { StackScreenProps } from "@react-navigation/stack";
import { useRegisterMutation } from "@/shared/api/auth";
import logger from "@/shared/utils/logger";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";

type FieldType = {
  mobile: string;
};

const RegisterScreen = ({
  navigation,
}: StackScreenProps<AuthRegisterParamList, "Account Information">) => {
  const styles = useStyles();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<FieldType>({
    defaultValues: {
      mobile: "",
    },
  });

  const [register, regResponse] = useRegisterMutation();

  const handleSubmitPressed = async ({ mobile }: FieldType) => {
    try {
      const {
        data: { mobileNumber },
        status,
      } = await register({ mobileNumber: mobile }).unwrap();

      if (status === 200) {
        navigation.navigate("Verify Number", {
          mobileNumber,
        });
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("auth", err);
    }
  };

  useEffect(() => {
    if (regResponse.error && "status" in regResponse.error) {
      setError("mobile", { message: regResponse.error.data.message });
      regResponse.reset();
    }
  }, [regResponse.error]);

  return (
    <Container
      type="pressable"
      containerProps={{
        style: styles.wrapper,
        onPress: Keyboard.dismiss,
      }}
    >
      <View style={{}}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Create an Account to connect with those who share the same health
            struggles as you and gain support through groups, symptom tracking,
            and by sharing your wins and losses.
          </Text>
          {regResponse.error && "status" in regResponse.error && (
            <Text>{regResponse.error.data.message}</Text>
          )}
        </View>
        <NumberInput control={control} />
      </View>

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

const useStyles = makeStyles((theme) => ({
  wrapper: {
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
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
    color: theme.colors.grey1,
  },
}));
