import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import { StyleConstants } from "@/shared/styles";
import { Button, Icon, Input, makeStyles, Text, useTheme } from "@rneui/themed";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { useCreatePostMutation } from "@/shared/api/post";
import { BackendResponse, BackendErrorResponse } from "@/shared/types";
import logger from "@/shared/utils/logger";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useIsDark from "@/shared/hooks/useIsDark";

interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  groupId: string;
}

type FieldType = {
  message: string;
};

const HEIGHT = Dimensions.get("window").height;
const MAX_POST_LENGTH = 300;

const AddPostModal = (props: IModalProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const { theme } = useTheme();
  const [createPost, createPostResponse] = useCreatePostMutation();
  const isDark = useIsDark();
  const styles = useStyles({ isDark });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setValue,
  } = useForm<FieldType>({
    defaultValues: {
      message: "",
    },
  });

  const message = watch("message");
  const handleClose = () => {
    props.onClose();
  };

  const handleAddPost = async (val: FieldType) => {
    try {
      const body = {
        message: val.message,
        groupId: props.groupId,
      };
      const { status } = await createPost(body).unwrap();
      if (status === 200) {
        handleClose();
        setValue("message", "");
        createPostResponse.reset();
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      setError("message", {
        message: err.data.message,
      });
      logger("post", err);
    }
  };

  const handleAnimation = (event: GestureResponderEvent) => {
    Animated.spring(animation, {
      toValue: event.nativeEvent.pageY * 1.5,
      useNativeDriver: false,
      speed: 40,
    }).start();
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.wrapper}
      onBackdropPress={handleClose}
      avoidKeyboard
      useNativeDriverForBackdrop
      presentationStyle="overFullScreen"
      onStartShouldSetResponder={() => true}
      onResponderRelease={(e) => {
        const threshold = HEIGHT * 0.6;
        if (e.nativeEvent.pageY > threshold) {
          handleClose();
        } else {
          Animated.timing(animation, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      }}
      onResponderMove={handleAnimation}
    >
      <Animated.View
        style={[
          styles.container,
          {
            maxHeight: animation.interpolate({
              inputRange: [0, HEIGHT],
              outputRange: ["100%", "35%"],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.notch} />
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose}>
                <Icon type="entypo" name="cross" color={theme.colors.grey3} />
              </TouchableOpacity>
              <Button
                title={createPostResponse.isSuccess ? "Success" : "Post"}
                onPress={handleSubmit(handleAddPost)}
                loading={createPostResponse.isLoading}
                disabled={!!errors.message}
                containerStyle={{
                  minWidth: 100,
                  height: 50,
                }}
              />
            </View>
            <Text
              style={[styles.inputLabel, { fontSize: 12, textAlign: "right" }]}
            >
              {message.length}/{MAX_POST_LENGTH}
            </Text>
            <KeyboardAwareScrollView>
              <Controller
                name="message"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Cannot post an empty message",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    maxLength={MAX_POST_LENGTH}
                    errorMessage={error?.message}
                    multiline
                    inputStyle={{
                      height: Math.max(250, multilineHeight),
                      color: isDark ? theme.colors.white : theme.colors.black,
                      textAlignVertical: "top",
                      paddingTop: 4,
                    }}
                    placeholder="Type your thoughts.."
                    {...field}
                    onContentSizeChange={(event) => {
                      setMultiLineHeight(event.nativeEvent.contentSize.height);
                    }}
                    onChangeText={field.onChange}
                    labelStyle={{ fontSize: 16 }}
                  />
                )}
              />
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default AddPostModal;

const useStyles = makeStyles((theme, props: { isDark: boolean }) => ({
  wrapper: {
    margin: 0,
    width: "100%",
  },
  container: {
    flex: 0,
    height: "70%",
    width: "100%",
    marginTop: "auto",
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonContainer: {
    width: "100%",
  },
  notch: {
    width: "12%",
    height: 4,
    borderRadius: 10,
    backgroundColor: theme.colors.black,
    alignSelf: "center",
    marginBottom: 24,
  },
  contentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: StyleConstants.PADDING_VERTICAL,
  },
  content: {
    width: "100%",
    flex: 1,
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
  inputLabel: {
    color: props.isDark ? theme.colors.black : theme.colors.primary,
    marginBottom: StyleConstants.PADDING_VERTICAL,
  },
  scrollView: {},
}));
