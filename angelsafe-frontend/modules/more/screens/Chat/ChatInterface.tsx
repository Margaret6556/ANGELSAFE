import { KeyboardAvoidingView, Platform } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ChatParamsList } from "@/more/types";
import { Container, Loading } from "@/shared/components";
import { GiftedChat, IMessage, User } from "react-native-gifted-chat";
import { makeStyles } from "@rneui/themed";
import { useCreateChatMutation, useViewChatQuery } from "@/shared/api/chat";
import { useAppSelector } from "@/shared/hooks";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import logger from "@/shared/utils/logger";

const ChatInterface = ({
  navigation,
  route,
}: StackScreenProps<ChatParamsList, "ChatInterface">) => {
  const receiverId = route.params.id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data, isError, isLoading, isSuccess } = useViewChatQuery({
    receiverId,
  });
  const [createChat, createChatResponse] = useCreateChatMutation();
  const { user } = useAppSelector((state) => state.auth);
  const styles = useStyles();

  useEffect(() => {
    if (!isLoading && !!data?.data.length && isSuccess) {
      const isSender = data.data[data.data.length - 1].sender.id === user?.id;

      let d = data.data[data.data.length - 1];
      // let a = {
      //   receiver: {
      //     id: d.receiver.id,
      //     username: d.receiver.username,
      //   },
      //   sender: {
      //     id: d.sender.id,
      //     username: d.sender.username,
      //   },
      // };

      if (isSender) {
        logger("chat", `i am sender, ${user.id}`);
      } else {
        logger("chat", `i am receiver, ${user?.id}`);
      }

      const mappedObject: IMessage[] = data.data
        .map((i) => ({
          _id: i.id,
          text: i.message,
          createdAt: new Date(i.timestamp),
          user: {
            _id: isSender ? i.sender.id : i.receiver.id,
            name: isSender ? i.sender.id : i.receiver.username,
            avatar: isSender ? i.sender.id : i.receiver.profilePic,
          },
        }))
        .reverse();
      setMessages(mappedObject);
    }
  }, [data]);

  if (isError) {
    return null;
  }

  if (isLoading) {
    return <Loading solidBg={true} />;
  }

  const onSend = async (messages: IMessage[] = []) => {
    try {
      const body = {
        receiverId,
        message: messages[0].text,
      };
      const { data, status } = await createChat(body).unwrap();

      if (status === 200) {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("chat", err);
    }
  };

  return (
    <Container
      containerProps={{
        style: styles.container,
      }}
    >
      {user?.id && (
        <>
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: user.id,
              name: user.username,
              avatar: user.profilePic,
            }}
            wrapInSafeArea={false}
            renderAvatarOnTop
            // forceGetKeyboardHeight
            alwaysShowSend
          />
        </>
      )}
    </Container>
  );
};

export default ChatInterface;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    alignItems: "stretch",
    width: "100%",
    maxHeight: "100%",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
}));
