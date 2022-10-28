import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { makeStyles } from "@rneui/base";

interface ISymptomsCard {
  title: string;
}

const SymptomsCard = ({ title }: ISymptomsCard) => {
  const [isChecked, setChecked] = useState(false);
  const styles = useStyles();

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

const useStyles = makeStyles((theme) => ({
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
    // color: "#333",
  },
}));
