import { makeStyles } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import Card from "./Card";

interface ISymptomsComponent {
  symptoms: string[];
}

const SymptomsComponent = ({ symptoms }: ISymptomsComponent) => {
  const styles = useStyles();
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

const useStyles = makeStyles((theme) => ({
  container: {
    marginVertical: theme.spacing.md,
  },
}));
