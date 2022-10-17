import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { GroupParamsList } from "../types";
import Groups from "../components/Groups";
import { StackScreenProps } from "@react-navigation/stack";

const EntryScreen = ({
  navigation,
}: StackScreenProps<GroupParamsList, "Entry">) => {
  return (
    <Container
      containerProps={{
        style: styles.wrapper,
      }}
    >
      <Groups />
    </Container>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-start",
    paddingVertical: 0,
  },
});
