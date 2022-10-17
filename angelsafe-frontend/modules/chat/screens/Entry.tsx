import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { StyleConstants } from "@/shared/styles";
import { ChatParamsList, ChatScreenProps } from "../types";

const EntryScreen = ({
  navigation,
}: ChatScreenProps<ChatParamsList, "Entry">) => {
  return (
    <Container
      type="scroll"
      containerProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <View>
        <Text>Chat</Text>
      </View>
    </Container>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({});
