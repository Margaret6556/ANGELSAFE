import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { StyleConstants } from "@/shared/styles";
import { Button, Image, makeStyles, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { moods } from "@/home/data";
import { MoodsType } from "@/home/types";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useCreateStatMutation } from "@/shared/api/stats";
import { setLastSubmitted } from "@/shared/state/reducers/experience";
import { apiSlice } from "@/shared/api";
import logger from "@/shared/utils/logger";

interface IModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const index = (props: IModalProps) => {
  const { mood, symptoms } = useAppSelector((state) => state.experience);
  const [createStat, createStatResponse] = useCreateStatMutation();
  const dispatch = useAppDispatch();
  const [selectedMood, setSelectedMood] = useState<MoodsType | null>(null);
  const [updated, setUpdated] = useState(false);

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
        dispatch(setLastSubmitted(new Date().getTime()));
        dispatch(apiSlice.util.invalidateTags(["STAT"]));
        setTimeout(() => {
          handleClose();
        }, 1500);
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
      onBackdropPress={handleClose}
      avoidKeyboard
    >
      <Container
        containerProps={{
          style: styles.container,
        }}
      >
        <View style={styles.content}>
          <Text h2 style={{ textAlign: "center", marginBottom: 56 }}>
            Daily Entry Log
          </Text>
          <Text style={{ marginBottom: 40 }}>You stated you're:</Text>
          <View style={styles.contentSection}>
            <Text style={{ flex: 1 }}>Feeling:</Text>
            {selectedMood?.image && (
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={selectedMood.image}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 12,
                  }}
                />
                <Text style={styles.labelSelection}>{selectedMood.label}</Text>
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
          {updated ? (
            <View style={styles.textSuccessContainer}>
              <Text style={styles.textSuccess}>Success!</Text>
            </View>
          ) : (
            <>
              <Button
                title="Submit"
                style={{ marginBottom: 24 }}
                onPress={handleCreateStat}
                loading={createStatResponse.isLoading}
                disabled={invalid}
              />
              <Button title="Cancel" type="outline" onPress={handleClose} />
            </>
          )}
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
    width: "100%",
    marginTop: "auto",
    height: "70%",
    backgroundColor: theme.colors.background,
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
  buttons: {
    width: "100%",
    flex: 1,
    justifyContent: props.isSuccess ? "center" : "flex-end",
  },
  textSuccessContainer: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    backgroundColor: theme.colors.success,
    justifyContent: "center",
  },
  textSuccess: {
    color: theme.colors.white,
    fontFamily: "nunitoBold",
    fontSize: 18,
    textAlign: "center",
  },
}));
