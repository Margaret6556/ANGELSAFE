import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { StyleConstants } from "@/shared/styles";
import { Button, Icon, Image, makeStyles, Text, useTheme } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Modal from "react-native-modal";
import { moods } from "@/home/data";
import { MoodsType } from "@/home/types";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useCreateStatMutation } from "@/shared/api/stats";
import {
  setHasCancelled,
  setLastSubmitted,
} from "@/shared/state/reducers/experience";
import { apiSlice } from "@/shared/api";
import logger from "@/shared/utils/logger";
import { scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

interface IModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const index = (props: IModalProps) => {
  const newEntryLoggedImage = require("../../../../assets/home/newEntry.png");
  const { mood, symptoms } = useAppSelector((state) => state.experience);
  const [createStat, createStatResponse] = useCreateStatMutation();
  const dispatch = useAppDispatch();
  const [selectedMood, setSelectedMood] = useState<MoodsType | null>(null);
  const [updated, setUpdated] = useState(false);
  const { theme } = useTheme();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mood) {
      setSelectedMood(() => moods.find((m) => m.label === mood) || null);
    }
    return () => {};
  }, [mood, symptoms]);

  const styles = useStyles({
    isSuccess: createStatResponse.isSuccess,
  });

  const handleClose = () => {
    createStatResponse.reset();
    setUpdated(false);
    dispatch(setHasCancelled());
    props.onCancel();
  };

  const invalid = !mood || !!!symptoms.length || !selectedMood;

  const handleCreateStat = async () => {
    if (invalid) return;

    try {
      const body = {
        stat: selectedMood.id,
        experience: symptoms,
      };

      const { status } = await createStat(body).unwrap();

      if (status === 200) {
        setUpdated(true);
        Animated.timing(animation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
        dispatch(setLastSubmitted(new Date().getTime()));
        dispatch(apiSlice.util.invalidateTags(["STAT"]));
        setTimeout(() => {
          animation.setValue(0);
          handleClose();
        }, 4000);
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("home", err);
    }
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.wrapper}
      useNativeDriverForBackdrop
      onBackdropPress={handleClose}
      avoidKeyboard
    >
      <Container
        containerProps={{
          style: styles.container,
        }}
      >
        {!updated ? (
          <>
            <View style={styles.content}>
              <Text h2 style={styles.h2}>
                Daily Entry Log
              </Text>
              <Text style={{ marginBottom: scale(24) }}>
                You stated you're:
              </Text>
              <View style={styles.contentSection}>
                <Text style={{ flex: 1 }}>Feeling:</Text>
                {selectedMood?.image && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={selectedMood.image}
                      style={styles.moodImage}
                    />
                    <Text style={styles.labelSelection}>
                      {selectedMood.label}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.contentSection}>
                <Text style={{ flex: 1 }}>Experiencing:</Text>
                {invalid ? (
                  <Text style={(styles.labelSelection, { flex: 1 })}>
                    Please add symptoms
                  </Text>
                ) : (
                  <Text style={[styles.labelSelection, { flex: 1 }]}>
                    {symptoms.reduce((p, c) => (!p ? c : `${p}, ${c}`), "")}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.buttons}>
              <Button
                title="Submit"
                containerStyle={styles.marginBottom}
                onPress={handleCreateStat}
                loading={createStatResponse.isLoading}
                disabled={invalid}
              />
              <Button title="Cancel" type="outline" onPress={handleClose} />
            </View>
          </>
        ) : (
          <Animated.View
            style={[
              styles.content,
              {
                justifyContent: "space-between",
                opacity: animation,
              },
            ]}
          >
            <Text h2 style={styles.h2}>
              New Entry Logged
            </Text>
            <Image
              source={newEntryLoggedImage}
              resizeMode="contain"
              style={{
                width: "100%",
                height: scale(180),
              }}
            />
            <View style={styles.marginBottom}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  type="ionicon"
                  name="information-circle"
                  color={theme.colors.primary}
                />
                <Text style={styles.viewThis}>
                  You can view this on your profile
                </Text>
              </View>
              <Button title="Close" onPress={handleClose} />
            </View>
          </Animated.View>
        )}
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
  h2: { textAlign: "center", marginBottom: theme.spacing.xl },
  container: {
    flex: 0,
    width: "100%",
    marginTop: "auto",
    height: "70%",
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    borderTopLeftRadius: sizing.BORDER_RADIUS,
    borderTopRightRadius: sizing.BORDER_RADIUS,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  buttonContainer: {
    width: "100%",
  },
  moodImage: {
    width: scale(30),
    height: scale(30),
    marginRight: theme.spacing.lg,
  },
  marginBottom: { marginBottom: theme.spacing.lg },
  contentSection: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "100%",
    marginBottom: theme.spacing.xl,
  },
  content: {
    width: "100%",
    flex: 2,
  },
  labelSelection: {
    fontFamily: "nunitoBold",
  },
  buttons: {
    minWidth: "100%",
    flex: 1,
    justifyContent: props.isSuccess ? "center" : "flex-end",
  },
  viewThis: {
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: sizing.FONT.md,
  },
}));
