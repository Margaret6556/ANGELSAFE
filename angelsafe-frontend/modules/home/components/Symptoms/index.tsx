import { StyleConstants } from "@/shared/styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "./Card";

interface ISymptomsComponent {
  symptoms: string[];
}

const SymptomsComponent = ({ symptoms }: ISymptomsComponent) => {
  return (
    <>
      {symptoms.map((i) => (
        <View key={`${i}-${Math.random()}`} style={styles.container}>
          <Card title={i} />
        </View>
      ))}
    </>
  );
};

export default SymptomsComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: StyleConstants.GAP_VERTICAL,
  },
});
