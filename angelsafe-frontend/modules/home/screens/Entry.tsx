import React, { useEffect, useState } from "react";
import { HomeParamsList } from "@/home/types";
import { View } from "react-native";
import { makeStyles, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
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
import store from "@/shared/state";
import { useDebouncedCallback } from "use-debounce";
import { useViewStatQuery } from "@/shared/api/stats";
import {
  setLastSubmitted,
  setMood,
  setSymptoms,
} from "@/shared/state/reducers/experience";

const EntryScreen = ({
  navigation,
}: StackScreenProps<HomeParamsList, "Entry">) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    auth: { user, redirectToGroup },
    experience: { mood, symptoms, lastSubmitted },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NavigationProp<AppTabParamList>>();
  const styles = useStyles();
  const statQuery = useViewStatQuery();
  const debouncedOpenModal = useDebouncedCallback(
    () => handleToggleModalVisibility(true),
    4500
  );

  /**
   * After a successful user registration, if user presses on "GO TO GROUPS",
   * this view will be mounted, this useEffect will navigate user to Groups Screen
   * instead of home
   * */

  useEffect(() => {
    if (redirectToGroup) {
      navigate("Groups");
    }
  }, []);

  useEffect(() => {
    if (statQuery.data?.data) {
      const { experience, stat } = statQuery.data.data;
      const found = moods.find((i) => i.id === stat);
      if (found) {
        dispatch(setMood(found.label));
      }
      experience.forEach((i) => {
        dispatch(setSymptoms(i));
      });
      dispatch(setLastSubmitted(new Date().getTime()));
    }
  }, [statQuery]);

  useEffect(() => {
    const handleModal = () => {
      const {
        experience: { mood, symptoms, lastSubmitted },
      } = store.getState();

      if (mood && !!symptoms.length && !lastSubmitted) {
        handleToggleModalVisibility();
      }
    };

    const unsubscribe = navigation.addListener("blur", handleModal);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (mood && !!symptoms.length && !lastSubmitted) {
      debouncedOpenModal();
    }
  }, [mood, symptoms, lastSubmitted]);

  const handleToggleModalVisibility = (bool?: boolean) => {
    setModalVisible(bool || !modalVisible);
  };

  return (
    <>
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
            <SymptomsComponent symptoms={initialSymptoms} />
            <AddNewSymptomButton onPress={handleToggleModalVisibility} />
          </View>
        </View>
      </Container>
      <Modal isVisible={modalVisible} onCancel={handleToggleModalVisibility} />
    </>
  );
};

export default EntryScreen;

const useStyles = makeStyles((theme) => ({
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
}));
