import { additionalSymptoms } from "@/home/data";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { setInitialSymptoms } from "@/shared/state/reducers/experience";
// import { setInitialSymptoms } from "@/shared/state/reducers/experience";
import { StyleConstants } from "@/shared/styles";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import {
  Button,
  CheckBox,
  Icon,
  ListItem,
  makeStyles,
  Text,
} from "@rneui/themed";
import React, { useState } from "react";
import { SectionList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

interface IModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const index = (props: IModalProps) => {
  // const [symptoms, setNewSymptoms] = useState<string[]>([]);
  const styles = useStyles();
  const { initialSymptoms } = useAppSelector((state) => state.experience);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    props.onCancel();
  };

  const handleAddSymptom = (item: string) => () => {
    dispatch(setInitialSymptoms(item));

    // let arr = [...symptoms, item];
    // if (symptoms.includes(item)) {
    //   arr = arr.filter((i) => i !== item);
    // }
    // setNewSymptoms(arr);
  };

  const handleSubmit = () => {
    // dispatch(setInitialSymptoms(symptoms));
    handleClose();
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
          <Text h2 style={{ textAlign: "center", marginBottom: 56 }}>
            Add Symptoms
          </Text>
          <SectionList
            sections={additionalSymptoms}
            keyExtractor={(item, index) => item + index}
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
          />

          <Button title="Done" onPress={handleSubmit} />
        </View>
      </Container>
    </Modal>
  );
};

export default index;

const useStyles = makeStyles((theme, props: { isSuccess: boolean }) => ({
  wrapper: {
    margin: 0,
    width: "100%",
  },
  container: {
    flex: 0,
    height: "80%",
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
}));
