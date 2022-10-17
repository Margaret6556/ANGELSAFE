import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

type Props = {};

const LoadingComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
