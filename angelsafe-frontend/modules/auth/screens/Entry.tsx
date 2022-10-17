import React, { useState } from "react";
import { AuthScreenProps, AuthParamList } from "@/auth/types";
import { View, StyleSheet } from "react-native";
import {
  ButtonGroup,
  Button,
  Image,
  Text,
  Input,
  CheckBox,
} from "@rneui/themed";
import { Container } from "@/shared/components";

const LoginScreen = ({
  navigation,
}: AuthScreenProps<AuthParamList, "Entry">) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Container>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          resizeMode="contain"
          style={styles.image}
          containerStyle={styles.imageContainer}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Login"
          onPress={() => {
            navigation.push("Login");
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
    height: 130,
    justifyContent: "space-between",
  },
  imageContainer: {},
  image: {
    width: 180,
    height: 180,
  },
});
