import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ChatParamsList } from "@/more/types";
import { Container } from "@/shared/components";

type Props = {};

const ChatInterface = ({
  navigation,
  route,
}: StackScreenProps<ChatParamsList, "ChatInterface">) => {
  return (
    <Container
      containerProps={{
        style: styles.container,
      }}
    >
      <Text>ChatListScreen</Text>
    </Container>
  );
};

export default ChatInterface;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
