import React from "react";
import { AuthParamList } from "@/auth/types";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { Container, Logo } from "@/shared/components";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleConstants } from "@/shared/styles";

const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, "Entry">) => {
  return (
    <Container>
      <View style={styles.imageContainer}>
        <Logo />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Login"
          onPress={() => {
            navigation.push("Login");
          }}
          buttonStyle={{
            marginBottom: StyleConstants.PADDING_VERTICAL,
          }}
        />
        <Button
          title="Sign Up"
          color="#333"
          type="outline"
          onPress={() => {
            navigation.setOptions({});
            navigation.push("Register");
          }}
        />
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "100%",
    justifyContent: "space-between",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
