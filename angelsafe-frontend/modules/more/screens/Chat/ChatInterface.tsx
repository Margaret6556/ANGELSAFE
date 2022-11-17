import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ChatParamsList } from "@/more/types";
import { Container, Loading } from "@/shared/components";
import { GiftedChat, IMessage, User } from "react-native-gifted-chat";
import { makeStyles } from "@rneui/themed";
import { useCreateChatMutation, useViewChatQuery } from "@/shared/api/chat";
import { useAppSelector } from "@/shared/hooks";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import logger from "@/shared/utils/logger";
import { useSocketContext } from "@/shared/providers/SocketProvider";

const ChatInterface = ({
  navigation,
  route,
}: StackScreenProps<ChatParamsList, "ChatInterface">) => {
  const receiverId = route.params.id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data, isError, isLoading, isSuccess } = useViewChatQuery({
    receiverId,
    skip: "50",
  });
  const [createChat, createChatResponse] = useCreateChatMutation();
  const { user } = useAppSelector((state) => state.auth);
  const styles = useStyles();
  const { handleSetCb } = useSocketContext();
  useEffect(() => {
    if (!isLoading && !!data?.data.length && isSuccess && user) {
      const copy = [...data.data].reverse(); // make newest 0
      const isSender = copy[0].sender.id === user.id;
      // const swapped = copy.map(i => ({
      //   ...i,
      //   receiver: i.receiver.id
      // }))

      const aaa = {
        receiver: {
          ...copy[0].receiver,
          profilePic: "",
          hobbies: "",
          movies: "",
          music: "",
          bio: "",
        },
        sender: {
          ...copy[0].sender,
          profilePic: "",
          hobbies: "",
          movies: "",
          music: "",
          bio: "",
        },
      };

      // console.log(
      //   `

      //   `,
      //   { sender: aaa.sender },
      //   `

      //   `,
      //   {
      //     receiver: aaa.receiver,
      //   },
      //   `

      //   `,
      //   { user: user.id, receiverId, msgId: copy[0].id },
      //   `

      //   `
      // );

      if (isSender) {
        logger("chat", `i am sender, ${user.id}`);
        logger("chat", `receiver id, ${aaa.receiver.id}`);
      } else {
        logger("chat", `i am receiver, ${user?.id}`);
        logger("chat", `sender id, ${aaa.sender.id}`);
      }
      logger("chat", `the message: ${copy[0].message}`);

      const mappedObject: IMessage[] = copy.map((i) => ({
        _id: i.id,
        text: i.message,
        createdAt: new Date(i.timestamp),
        user: {
          _id: isSender ? i.sender.id : i.receiver.id,
          name: isSender ? i.sender.username : i.receiver.username,
          avatar: isSender ? i.sender.profilePic : i.receiver.profilePic,
        },
      }));
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
            messagesContainerStyle={{}}
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
