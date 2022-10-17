import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HomeParamsList, HomeScreenProps } from "../types";
import { Container } from "@/shared/components";

type Props = {};

const AddNewSymptom = ({
  navigation,
}: HomeScreenProps<HomeParamsList, "Add New Symptom">) => {
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
