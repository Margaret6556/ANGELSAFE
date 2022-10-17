import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Icon } from "@rneui/themed";
import { Text } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HomeParamsList, HomeScreenProps } from "@/home/types";

type IAddSymptomProps = {
  onPress: () => void;
};

const AddNewSymptomButton = (props: IAddSymptomProps) => {
  const { navigate } = useNavigation<any>();
  const handlePress = () => {
    // navigate("Add New Symptom");
    props.onPress();
  };
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <Icon
        type="entypo"
        name="squared-plus"
        iconProps={{
          size: 32,
          name: "squared-plus",
        }}
      />
      <Text style={styles.text}>Add new symptoms</Text>
    </TouchableOpacity>
  );
};

export default AddNewSymptomButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  text: {
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
});
