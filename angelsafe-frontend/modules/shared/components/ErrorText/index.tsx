import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import Container from "../Container";

const ErrorText = () => {
  const styles = useStyles();
  const [message, setMessage] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const msg = text[Math.round(Math.random() * (text.length - 1))];
    setMessage(msg);
  }, []);

  return (
    <Container>
      <Text
        style={{
          fontFamily: "nunitoItalic",
          color: theme.colors.error,
        }}
      >
        {message}
      </Text>
    </Container>
  );
};

export default ErrorText;

const useStyles = makeStyles({
  container: {},
});

const text = [
  "Apologies, the server is temporarily down. Please try again after in a few hours.",
  "We understand this is frustrating for you but things like this happen and we are doing our best to solve this issue.",
];
