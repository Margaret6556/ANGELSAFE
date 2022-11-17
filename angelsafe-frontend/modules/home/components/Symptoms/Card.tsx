import React, { useState } from "react";
import { ListItem, Text } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { makeStyles } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { setSymptoms } from "@/shared/state/reducers/experience";
import { moderateScale } from "react-native-size-matters";

interface ISymptomsCard {
  title: string;
}

const SymptomsCard = ({ title }: ISymptomsCard) => {
  const [isChecked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { symptoms } = useAppSelector((state) => state.experience);
  const includedSymptom = symptoms.includes(title);
  const styles = useStyles({
    includedSymptom: !!!symptoms.length ? "empty" : includedSymptom,
  });

  const handleCheck = () => {
    dispatch(setSymptoms(title));
    setChecked(!isChecked);
  };

  return (
    <ListItem containerStyle={styles.container} onPress={handleCheck}>
      <ListItem.Content style={styles.content}>
        <ListItem.CheckBox
          containerStyle={styles.checkbox}
          checked={includedSymptom}
        />
        <Text>{title}</Text>
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
      borderRadius: theme.spacing.md,
      opacity: props.includedSymptom ? 1 : 0.6,
      minHeight: moderateScale(50, 0.5),
    },
    content: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    checkbox: {
      marginRight: theme.spacing.lg,
    },
  })
);
