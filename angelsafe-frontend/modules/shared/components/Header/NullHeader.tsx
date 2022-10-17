import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import Container from "../Container";

type Props = {
  title: string;
};

const NullHeader = (props: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.title}</Text>
  </View>
);

export default NullHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    height: StyleConstants.HEADER_TEXT_HEIGHT,
  },
  title: {},
});
