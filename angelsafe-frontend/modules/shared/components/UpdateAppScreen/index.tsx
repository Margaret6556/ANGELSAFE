import { View } from "react-native";
import { Image, makeStyles, Text } from "@rneui/themed";
import React from "react";
import Container from "../Container";
import Logo from "../Logo";
import { A } from "@expo/html-elements";
import { APP_URL } from "@/shared/config";

const UpdateAppScreen = () => {
  const styles = useStyles();
  return (
    <Container>
      <Logo />
      <Text style={{ textAlign: "center" }}>
        There's currently a new version of the app, please download the latest
        version from the{" "}
        <Text style={styles.link}>
          <A href={APP_URL}>AngelSafe mobile-app website</A>
        </Text>
        .
      </Text>
    </Container>
  );
};

export default UpdateAppScreen;

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.colors.primary,
  },
}));
