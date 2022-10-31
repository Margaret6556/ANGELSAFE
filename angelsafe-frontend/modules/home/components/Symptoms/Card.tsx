import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { makeStyles } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { setSymptoms } from "@/shared/state/reducers/experience";

interface ISymptomsCard {
  title: string;
}

const SymptomsCard = ({ title }: ISymptomsCard) => {
  const [isChecked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { symptoms, isEditableToday } = useAppSelector(
    (state) => state.experience
  );
  const includedSymptom = symptoms.includes(title);
  const styles = useStyles({
    includedSymptom: !!!symptoms.length ? "empty" : includedSymptom,
  });

  const handleCheck = () => {
    dispatch(setSymptoms(title));
    setChecked(!isChecked);
  };

  return (
    <ListItem
      containerStyle={styles.container}
      onPress={handleCheck}
      // disabled={!isEditableToday}
    >
      <ListItem.Content style={styles.content}>
        <ListItem.CheckBox
          containerStyle={styles.checkbox}
          checked={includedSymptom}
        />
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default SymptomsCard;

const useStyles = makeStyles(
  (
    theme,
    props: {
      includedSymptom: boolean | "empty";
    }
  ) => ({
    container: {
      borderRadius: 12,
      opacity: props.includedSymptom ? 1 : 0.6,
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
  })
);
