import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Icon, Text } from "@rneui/themed";
import { useAppSelector } from "@/shared/hooks";

interface ITrendComponentProps {
  style?: StyleProp<ViewStyle>;
  winCount: number;
  painCount: number;
}

const TrendComponent = (props: ITrendComponentProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.iconContainer}>
        <Icon
          type="feather"
          name="trending-up"
          color="green"
          style={{ marginRight: 12 }}
        />
        <Text>{props.winCount} Wins</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon
          type="feather"
          name="trending-down"
          color="maroon"
          style={{ marginRight: 12 }}
        />
        <Text>{props.painCount} Pains</Text>
      </View>
    </View>
  );
};

export default TrendComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "65%",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
