import React from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import { useAppDispatch } from "@/shared/hooks";
import { Text, Button } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StackScreenProps } from "@react-navigation/stack";

const CreateAccount = ({
  navigation,
}: StackScreenProps<AuthRegisterParamList, "Create an Account">) => {
  return (
    <Container>
      <Image
        style={styles.image}
        source={require("../../../../assets/auth/Saly-31.png")}
      />
      <View style={styles.text}>
        <Text h4>Join the AngelSafe community.</Text>
        <Text style={styles.subtitle}>
          You have come to the right place to feel less lonely and improve your
          health!
        </Text>
      </View>

      <View style={styles.button}>
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.push("Account Information");
          }}
        />
      </View>
    </Container>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
  },
  text: {
    height: 72,
    justifyContent: "space-between",
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
  },
});
