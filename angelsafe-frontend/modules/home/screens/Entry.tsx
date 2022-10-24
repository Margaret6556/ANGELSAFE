import React, { useEffect, useState } from "react";
import { HomeParamsList, HomeScreenProps } from "@/home/types";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
// import { logout } from "@/shared/state/reducers/auth";
import {
  Modal,
  MoodsComponent,
  SymptomsComponent,
  AddNewSymptomButton,
} from "../components";
import { StyleConstants } from "@/shared/styles";
import { initialSymptoms, moods } from "../data";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppTabParamList } from "@/shared/types";

const EntryScreen = ({}: StackScreenProps<HomeParamsList, "Entry">) => {
  const [symptoms, setSymptoms] = useState(initialSymptoms);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { navigate } = useNavigation<NavigationProp<AppTabParamList>>();
  const { redirectToGroup } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    if (redirectToGroup) {
      navigate("Groups");
    }
  }, []);

  const handleOpenModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddSymptom = (val: string) => {
    if (val) {
      const newSymptom = [...symptoms, val];
      setSymptoms(newSymptom);
    }
    handleOpenModal();
  };

  return (
    <Container
      type="scroll"
      containerProps={{
        contentContainerStyle: styles.wrapper,
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Text h4>
            Welcome, {"\n"}
            {user?.username}
          </Text>
          <Text h4>How are you feeling today?</Text>
        </View>
        <MoodsComponent moods={moods} />
        <View style={[styles.title, {}]}>
          <Text>What are you experiencing?</Text>
        </View>
        <View style={styles.symptomsContainer}>
          <SymptomsComponent symptoms={symptoms} />
          <AddNewSymptomButton onPress={handleOpenModal} />
        </View>

        <Modal isVisible={modalVisible} onPress={handleAddSymptom} />
      </View>
    </Container>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 40,
    paddingHorizontal: 0,
    justifyContent: "flex-start",
    minHeight: 800,
  },
  container: {
    width: "100%",
  },
  title: {
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    marginBottom: 24,
  },
  symptomsContainer: {
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },

  modal: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL / 2,
    paddingVertical: StyleConstants.PADDING_VERTICAL / 2,
  },
});
