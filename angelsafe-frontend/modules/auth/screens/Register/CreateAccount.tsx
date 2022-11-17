import React from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useAppDispatch } from "@/shared/hooks";
import { Text, Button, Image, makeStyles } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StackScreenProps } from "@react-navigation/stack";
import { sizing } from "@/shared/providers/ThemeProvider";
import { moderateScale } from "react-native-size-matters";

const CreateAccount = ({
  navigation,
}: StackScreenProps<AuthRegisterParamList, "Create an Account">) => {
  const styles = useStyles();
  return (
    <Container>
      <Image
        style={{ width: moderateScale(180), height: moderateScale(180) }}
        containerStyle={styles.image}
        source={require("../../../../assets/auth/Saly-31.png")}
      />
      <View style={styles.text}>
        <Text h4 style={{ textAlign: "center" }}>
          Join the AngelSafe community.
        </Text>
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

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    justifyContent: "flex-end",
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    justifyContent: "flex-start",
    flex: 1,
  },
  subtitle: {
    textAlign: "center",
    fontSize: sizing.FONT.sm,
    color: theme.colors.grey1,
  },
}));
