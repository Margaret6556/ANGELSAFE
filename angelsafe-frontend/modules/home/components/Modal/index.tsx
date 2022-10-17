import { Container } from "@/shared/components";
import { useKeyboardShowing } from "@/shared/hooks";
import { StyleConstants } from "@/shared/styles";
import { Button, Icon, Input, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface IModalProps {
  isVisible: boolean;
  onPress: (val: string) => void;
}

const index = (props: IModalProps) => {
  const { keyboardIsShowing } = useKeyboardShowing();
  const [symptom, setSymptom] = useState("");
  const handlePress = () => {
    setSymptom("");
    props.onPress(symptom);
  };

  const handleInputChange = (val: string) => {
    setSymptom(val);
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.wrapper}
      onBackdropPress={handlePress}
      avoidKeyboard
    >
      <Container
        containerProps={{
          style: styles.container,
        }}
      >
        <Input
          label="Add new symptom"
          containerStyle={styles.inputContainer}
          onChangeText={handleInputChange}
          value={symptom}
        />

        <Button
          onPress={handlePress}
          containerStyle={[
            styles.buttonContainer,
            { display: keyboardIsShowing ? "none" : "flex" },
          ]}
          icon={
            <Icon
              type="entypo"
              name="squared-plus"
              iconProps={{
                size: 32,
                name: "squared-plus",
                color: "#fff",
              }}
            />
          }
        />
      </Container>
    </Modal>
  );
};

export default index;

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    width: "100%",
  },
  container: {
    flex: 0,
    width: "100%",
    marginTop: "auto",
    height: "35%",
    backgroundColor: "#dedede",
    justifyContent: "space-between",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  inputContainer: {},
  buttonContainer: {
    width: "100%",
  },
});
