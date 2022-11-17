import React from "react";
import { Icon, makeStyles, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

type IAddSymptomProps = {
  onPress: () => void;
};

const AddNewSymptomButton = (props: IAddSymptomProps) => {
  const styles = useStyles();
  const handlePress = () => {
    props.onPress();
  };
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <Icon type="entypo" name="squared-plus" />
      <Text style={styles.text}>Add new symptoms</Text>
    </TouchableOpacity>
  );
};

export default AddNewSymptomButton;

const useStyles = makeStyles((theme) => ({
  button: {
    marginVertical: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: theme.colors.grey1,
    marginLeft: theme.spacing.md,
    fontSize: theme.spacing.lg,
  },
}));
