import React, { useCallback, useEffect, useRef, useState } from "react";
import { HomeParamsList } from "@/home/types";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { Avatar, Button, ButtonProps, makeStyles, Text } from "@rneui/themed";
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
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import UpdateStatsButton from "../components/UpdateStatsButton";
// import {
//   setLastSubmitted,
//   setMood,
//   setSymptoms,
// } from "@/shared/state/reducers/experience";

const EntryScreen = ({
  navigation,
}: StackScreenProps<HomeParamsList, "Entry">) => {
  const animation = useRef(new Animated.Value(0)).current;
  const btnAnimation = useRef(new Animated.Value(0)).current;
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
  const { navigate } = useNavigation<NavigationProp<AppTabParamList>>();
  const styles = useStyles();

  const debouncedOpenModal = useDebouncedCallback(() => {
    if (!lastSubmitted || !hasCancelled) {
      Animated.spring(btnAnimation, {
        toValue: 50,
        useNativeDriver: true,
        bounciness: 20,
      }).start();
    }
  }, 800);

  /**
   * After a successful user registration, if user presses on "GO TO GROUPS",
   * this view will be mounted, this useEffect will navigate user to Groups Screen
   * instead of home
   * */

  useEffect(() => {
    if (redirectToGroup) {
      navigate("Groups", {
        screen: "Entry",
      });
    }
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (mood && !!symptoms.length) {
      debouncedOpenModal();
    }

    if (!!lastSubmitted && !modalVisible) {
      Animated.timing(btnAnimation, {
        toValue: 0,
        delay: 350,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [mood, symptoms, lastSubmitted, modalVisible]);

  const createAnimation = useCallback(
    (initialTranslateY: number): Animated.WithAnimatedObject<ViewStyle> => ({
      opacity: animation,
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [initialTranslateY, 0],
          }),
        },
        {
          scale: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    }),
    [animation]
  );

  const handleToggleSubmitModalVisibility = (bool?: boolean) => {
    setModalVisible(bool || !modalVisible);
  };

  const handleToggleAddSymptomsModal = (bool?: boolean) => {
    setSymptomsModalVisible(bool || !addSymptomsModalVis);
  };

  const handleNext = () => {
    handleToggleSubmitModalVisibility(true);
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
          <Animated.View
            style={[styles.title, styles.titleContainer, createAnimation(20)]}
          >
            <Text h4 h4Style={styles.h4}>
              Welcome Back! {"\n"}
              {user?.username}
            </Text>
            <Avatar
              source={{
                uri: user?.profilePic,
              }}
              rounded
              containerStyle={{
                marginRight: 4,
              }}
            />
          </Animated.View>
          <Animated.View style={createAnimation(60)}>
            <MoodsComponent moods={moods} />
          </Animated.View>
          <Animated.View style={createAnimation(100)}>
            <View style={styles.title}>
              <Text style={styles.experiencing}>
                What are you experiencing?
              </Text>
            </View>
            <View style={styles.symptomsContainer}>
              <SymptomsComponent symptoms={initialSymptoms} />
              <AddNewSymptomButton onPress={handleToggleAddSymptomsModal} />
            </View>
          </Animated.View>
        </View>
      </Container>
      <UpdateStatsButton animation={btnAnimation} onPress={handleNext} />
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
