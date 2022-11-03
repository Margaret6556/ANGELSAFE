import { Platform, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Avatar,
  Input,
  makeStyles,
  Button,
  useTheme,
  Icon,
} from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCreatePostMutation } from "@/shared/api/post";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import useDarkMode from "@/shared/hooks/useDarkMode";
import { Container } from "@/shared/components";
import logger from "@/shared/utils/logger";

interface AddPostProps {
  onClose: () => void;
  groupId: string;
}

type FieldType = {
  message: string;
};

const MAX_POST_LENGTH = 250;
const AddPost = (props: AddPostProps) => {
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const { theme } = useTheme();
  const [createPost, createPostResponse] = useCreatePostMutation();
  const isDark = useDarkMode();
  const styles = useStyles({ isDark });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
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
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      setError("message", {
        message: err.data.message,
      });
      logger("post", err);
    }
  };

  return (
    <Container
      containerProps={{
        style: styles.container,
      }}
    >
      <View style={styles.wrapper}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Icon
                type="entypo"
                name="cross"
                color={theme.colors.grey3}
                size={32}
              />
            </TouchableOpacity>
          </View>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Input
                maxLength={MAX_POST_LENGTH}
                label={
                  <View style={styles.inputLabelContainer}>
                    <Text style={styles.inputLabel}>Enter your Post</Text>
                    <Text style={[styles.inputLabel, { fontSize: 12 }]}>
                      {message.length}/{MAX_POST_LENGTH}
                    </Text>
                  </View>
                }
                errorMessage={errors.message?.message}
                multiline
                inputStyle={{
                  height: Math.max(250, multilineHeight),
                  color: isDark ? theme.colors.white : theme.colors.black,
                  textAlignVertical: "top",
                }}
                {...field}
                onContentSizeChange={(event) => {
                  setMultiLineHeight(event.nativeEvent.contentSize.height);
                }}
                onChangeText={field.onChange}
                labelStyle={{ fontSize: 16 }}
              />
            )}
          />
        </View>
        <Button
          title={createPostResponse.isSuccess ? "Success" : "Post"}
          onPress={handleSubmit(handleAddPost)}
          loading={createPostResponse.isLoading}
          disabled={!!errors.message}
        />
      </View>
    </Container>
  );
};

export default AddPost;

const useStyles = makeStyles((theme, props: { isDark: boolean }) => ({
  wrapper: {
    width: "100%",
    marginTop: "auto",
    backgroundColor: props.isDark ? theme.colors.white : theme.colors.grey5,
    justifyContent: "space-between",
    // alignItems: "stretch",
    borderTopLeftRadius: StyleConstants.PADDING_HORIZONTAL / 2,
    borderTopRightRadius: StyleConstants.PADDING_HORIZONTAL / 2,
    padding: 24,
    height: "60%",
  },
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingBottom: 0,
  },
  header: {
    width: "100%",
    marginBottom: StyleConstants.PADDING_VERTICAL / 2,
    // backgroundColor: "red",
    alignItems: "flex-start",
  },
  inputLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 12,
  },
  inputLabel: {
    color: props.isDark ? theme.colors.black : theme.colors.primary,
    marginBottom: StyleConstants.PADDING_VERTICAL,
  },
}));
