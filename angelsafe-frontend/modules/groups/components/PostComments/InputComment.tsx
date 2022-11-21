import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import React, { useState } from "react";
import { StyleConstants } from "@/shared/styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon, Input, makeStyles, Text, useTheme } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { useCommentPostMutation } from "@/shared/api/post";
import logger from "@/shared/utils/logger";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { moderateScale, scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

interface InputCommentProps {
  postId: string;
}

type FieldType = {
  comment: string;
};
const MAX_COMMENT_LENGTH = 200;

const InputComment = (props: InputCommentProps) => {
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const styles = useStyles();
  const { theme } = useTheme();
  const a = useBottomTabBarHeight();
  const b = useSafeAreaInsets();
  const { control, handleSubmit, watch, setError, reset } = useForm<FieldType>({
    defaultValues: {
      comment: "",
    },
  });
  const [postComment, postCommentResponse] = useCommentPostMutation();

  const commentLength = watch("comment");

  const handlePostComment = async (val: FieldType) => {
    try {
      const { status } = await postComment({
        postId: props.postId,
        message: val.comment,
      }).unwrap();

      if (status === 200) {
        reset();
        Keyboard.dismiss();
        setMultiLineHeight(0);
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("groups", err);
      setError("comment", {
        message: err.data.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.inputComment}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={a + b.top * 0.6}
    >
      <Controller
        name="comment"
        control={control}
        rules={{
          required: {
            message: "This is a required field",
            value: true,
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Text style={styles.commentLength}>
              {commentLength.length}/{MAX_COMMENT_LENGTH}
            </Text>
            <Input
              placeholder="Write a comment"
              inputStyle={{
                backgroundColor: theme.colors.grey5,
                height: Math.max(scale(24), multilineHeight),
              }}
              errorMessage={error?.message}
              maxLength={MAX_COMMENT_LENGTH}
              onContentSizeChange={(event) => {
                setMultiLineHeight(event.nativeEvent.contentSize.height);
              }}
              {...field}
              onChangeText={field.onChange}
              multiline
              rightIcon={{
                type: "ionicon",
                name: "send",
                onPress: handleSubmit(handlePostComment),
                color: theme.colors.secondary,
                size: scale(18),
                containerStyle: {
                  paddingLeft: theme.spacing.sm,
                },
                disabled: postCommentResponse.isLoading,
              }}
            />
          </>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default InputComment;

const useStyles = makeStyles((theme) => ({
  inputComment: {
    position: "absolute",
    bottom: 0,
    backgroundColor: theme.colors.background,
    width: "100%",
    padding: theme.spacing.lg,
    shadowOffset: {
      height: moderateScale(10),
      width: moderateScale(10),
    },
    shadowColor: theme.colors.grey1,
    shadowOpacity: 1,
    shadowRadius: moderateScale(10),
    elevation: moderateScale(10),
  },
  commentLength: {
    textAlign: "right",
    fontSize: sizing.FONT.xs,
    color: theme.colors.grey0,
  },
}));
