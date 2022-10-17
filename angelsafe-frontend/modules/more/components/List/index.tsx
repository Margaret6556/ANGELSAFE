import { MoreDataType } from "@/more/types";
import { StyleConstants } from "@/shared/styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "./Card";

interface IMoreComponent {
  list: MoreDataType;
}

const MoreComponent = ({ list }: IMoreComponent) => {
  return (
    <>
      {list.map((props) => (
        <View key={props.label} style={styles.container}>
          <Card {...props} />
        </View>
      ))}
    </>
  );
};

export default MoreComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: StyleConstants.GAP_VERTICAL,
  },
});
