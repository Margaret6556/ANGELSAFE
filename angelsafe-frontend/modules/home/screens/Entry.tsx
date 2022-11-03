import React, { useEffect, useState } from "react";
import { HomeParamsList } from "@/home/types";
import { View } from "react-native";
import { Avatar, makeStyles, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import {
  Modal,
  MoodsComponent,
  SymptomsComponent,
  AddNewSymptomButton,
  AddSymptomsModal,
} from "../components";
import { StyleConstants } from "@/shared/styles";
import { moods } from "../data";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppTabParamList } from "@/shared/types";
import store from "@/shared/state";
import { useDebouncedCallback } from "use-debounce";
import { useViewStatQuery } from "@/shared/api/stats";
// import {
//   setLastSubmitted,
//   setMood,
//   setSymptoms,
// } from "@/shared/state/reducers/experience";

const EntryScreen = ({
  navigation,
}: StackScreenProps<HomeParamsList, "Entry">) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addSymptomsModalVis, setSymptomsModalVisible] = useState(false);
  const {
    auth: { user, redirectToGroup },
    experience: {
      mood,
      symptoms,
      lastSubmitted,
      initialSymptoms,
      hasCancelled,
    },
  } = useAppSelector((state) => state);
  // const dispatch = useAppDispatch();
  const { navigate } = useNavigation<NavigationProp<AppTabParamList>>();
  const styles = useStyles();
  // const statQuery = useViewStatQuery();
  const debouncedOpenModal = useDebouncedCallback(() => {
    if (!lastSubmitted || !hasCancelled) {
      handleToggleSubmitModalVisibility(true);
    }
  }, 4500);

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
    const handleModal = () => {
      const {
        experience: { mood, symptoms, lastSubmitted },
      } = store.getState();

      if (mood && !!symptoms.length && !lastSubmitted && !hasCancelled) {
        handleToggleSubmitModalVisibility();
      }
    };

    const unsubscribe = navigation.addListener("blur", handleModal);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (mood && !!symptoms.length) {
      debouncedOpenModal();
    }
  }, [mood, symptoms, lastSubmitted]);

  const handleToggleSubmitModalVisibility = (bool?: boolean) => {
    setModalVisible(bool || !modalVisible);
  };

  const handleToggleAddSymptomsModal = (bool?: boolean) => {
    setSymptomsModalVisible(bool || !addSymptomsModalVis);
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
          <View style={[styles.title, styles.titleContainer]}>
            <Text h4 h4Style={styles.h4}>
              Welcome Back! {"\n"}
              {user?.username}
            </Text>
            <Avatar
              source={{
                uri: user?.profilePic,
              }}
              rounded
              size={45}
              containerStyle={{
                marginRight: 4,
              }}
            />
          </View>
          <MoodsComponent moods={moods} />
          <View style={[styles.title, {}]}>
            <Text style={styles.experiencing}>What are you experiencing?</Text>
          </View>
          <View style={styles.symptomsContainer}>
            <SymptomsComponent symptoms={initialSymptoms} />
            <AddNewSymptomButton onPress={handleToggleAddSymptomsModal} />
          </View>
        </View>
      </Container>
      {moods && !!symptoms.length && (
        <Modal
          isVisible={modalVisible}
          onCancel={handleToggleSubmitModalVisibility}
        />
      )}
      <AddSymptomsModal
        isVisible={addSymptomsModalVis}
        onCancel={handleToggleAddSymptomsModal}
      />
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  h4: {
    color: theme.colors.primary,
    fontFamily: "nunitoBold",
  },
  experiencing: {
    color: theme.colors.primary,
  },
}));
