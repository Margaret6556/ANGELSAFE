import { Text, View } from "react-native";
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

interface AddPostProps {
  onClose: () => void;
  groupId: string;
}

type FieldType = {
  message: string;
};

const MAX_POST_LENGTH = 250;
const AddPost = (props: AddPostProps) => {
  const styles = useStyles();
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const { theme } = useTheme();
  const [createPost, createPostResponse] = useCreatePostMutation();
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
        console.log("Post Success");
        handleClose();
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      setError("message", {
        message: err.data.message,
      });
      console.log({ e });
    }
  };

  return (
    <View style={styles.container}>
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
                  <Text
                    style={[
                      styles.inputLabel,
                      { fontSize: 14, color: theme.colors.grey0 },
                    ]}
                  >
                    {message.length}/{MAX_POST_LENGTH}
                  </Text>
                </View>
              }
              errorMessage={errors.message?.message}
              multiline
              inputStyle={{
                height: Math.max(250, multilineHeight),
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
  );
};

export default AddPost;

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    marginTop: "auto",
    height: "65%",
    backgroundColor: theme.colors.grey5,
    justifyContent: "space-between",
    borderTopLeftRadius: StyleConstants.PADDING_HORIZONTAL / 2,
    borderTopRightRadius: StyleConstants.PADDING_HORIZONTAL / 2,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
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
    marginBottom: 8,
  },
  inputLabel: {
    color: theme.colors.primary,
  },
}));
