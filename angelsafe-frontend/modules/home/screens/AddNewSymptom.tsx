import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HomeParamsList } from "../types";
import { Container } from "@/shared/components";
import { StackScreenProps } from "@react-navigation/stack";

type Props = {};

const AddNewSymptom = ({
  navigation,
}: StackScreenProps<HomeParamsList, "Add New Symptom">) => {
  return (
    <Container
      containerProps={{
        style: styles.wrapper,
      }}
    >
      <Text>AddNewSymptom</Text>
    </Container>
  );
};

export default AddNewSymptom;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
