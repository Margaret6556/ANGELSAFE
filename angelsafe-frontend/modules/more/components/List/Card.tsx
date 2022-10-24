import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { IMoreData } from "@/more/types";
import { TouchableOpacity } from "react-native-gesture-handler";

const MoreCard = ({ label, onPress }: IMoreData) => {
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <ListItem containerStyle={styles.container}>
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.title}>{label}</ListItem.Title>
          <ListItem.Chevron />
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default MoreCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    minHeight: 50,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkbox: {
    marginRight: StyleConstants.PADDING_HORIZONTAL,
  },
  title: {
    color: "#333",
  },
});

// const initialSymptoms = [
//   "Tiredness",
//   "Morning sickness",
//   "Headache",
//   "Bleeding",
//   "Changes on your skin",
//   "Swelling",
// ];
