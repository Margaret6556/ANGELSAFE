import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "../List/Card";
import callNumber from "@/shared/utils/callNumber";

const ResourcesComponent = () => {
  const handleEmotionalHelp = () => {
    callNumber("+9191231312");
  };
  const handleOverdose = () => {
    callNumber("+9191231312");
  };

  return (
    <>
      <View style={styles.container}>
        <Card
          icon={{}}
          label="Emotional Help Hotline"
          onPress={handleEmotionalHelp}
        />
      </View>
      <View style={styles.container}>
        <Card icon={{}} label="Overdose Hotline" onPress={handleOverdose} />
      </View>
    </>
  );
};

export default ResourcesComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
