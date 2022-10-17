import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";

interface ISymptomsCard {
  title: string;
}

const SymptomsCard = ({ title }: ISymptomsCard) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!isChecked);
  };

  return (
    <ListItem containerStyle={styles.container} onPress={handleCheck}>
      <ListItem.Content style={styles.content}>
        <ListItem.CheckBox
          containerStyle={styles.checkbox}
          checked={isChecked}
        />
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default SymptomsCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
