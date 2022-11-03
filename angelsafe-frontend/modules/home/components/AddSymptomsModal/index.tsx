import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import {
  setAdditionalSymptoms,
  setInitialSymptoms,
} from "@/shared/state/reducers/experience";
import { StyleConstants } from "@/shared/styles";
import {
  Button,
  CheckBox,
  Icon,
  Input,
  ListItem,
  makeStyles,
  Text,
} from "@rneui/themed";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

interface IModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const AddSymptomsModal = (props: IModalProps) => {
  const [customSymptoms, setCustomSymptoms] = useState("");
  const styles = useStyles();
  const { initialSymptoms, additionalSymptoms } = useAppSelector(
    (state) => state.experience
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    props.onCancel();
  };

  const handleAddSymptom = (item: string) => () => {
    dispatch(setInitialSymptoms(item));
  };

  const handleSubmit = () => {
    handleClose();
  };

  const handleInputChange = (text: string) => {
    setCustomSymptoms(text);
  };

  const handleAddCustomSymptom = () => {
    if (customSymptoms.length > 2) {
      dispatch(setAdditionalSymptoms(customSymptoms));
      setCustomSymptoms("");
    }
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.wrapper}
      onBackdropPress={handleClose}
      avoidKeyboard
      presentationStyle="overFullScreen"
    >
      <Container
        containerProps={{
          style: styles.container,
        }}
      >
        <View style={styles.content}>
          <Text h2 style={{ textAlign: "center", marginBottom: 36 }}>
            Add Symptoms
          </Text>
          <Input
            style={styles.input}
            placeholder="Custom symptoms"
            maxLength={30}
            autoCapitalize="none"
            value={customSymptoms}
            rightIcon={{
              type: "ionicon",
              name: "add",
              onPress: handleAddCustomSymptom,
              iconStyle: {},
              style: {},
              containerStyle: styles.inputIconContainerStyle,
            }}
            onChangeText={handleInputChange}
          />
          <FlatList
            data={additionalSymptoms}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleAddSymptom(item)}
              >
                <ListItem bottomDivider>
                  <View style={styles.listItemWrapper}>
                    <Text>{item}</Text>
                    <CheckBox checked={initialSymptoms.includes(item)} />
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <Button
                title="Done"
                onPress={handleSubmit}
                containerStyle={{
                  marginVertical: 24,
                }}
              />
            }
          />
        </View>
      </Container>
    </Modal>
  );
};

export default AddSymptomsModal;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: 0,
    width: "100%",
  },
  container: {
    flex: 0,
    height: "90%",
    width: "100%",
    marginTop: "auto",
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  buttonContainer: {
    width: "100%",
  },
  contentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: StyleConstants.PADDING_VERTICAL,
  },
  content: {
    width: "100%",
    flex: 2,
  },
  labelSelection: {
    fontFamily: "nunitoBold",
  },
  listItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    backgroundColor: theme.colors.grey5,
  },
  inputIconContainerStyle: {
    // height: "100%",
    // backgroundColor: theme.colors.grey1,
    // justifyContent: "center",
  },
}));
