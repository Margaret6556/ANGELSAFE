import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ChatParamsList } from "@/more/types";
import { Container, Loading } from "@/shared/components";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { makeStyles } from "@rneui/themed";
import { useCreateChatMutation, useLazyViewChatQuery } from "@/shared/api/chat";
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
  const [isReady, setIsReady] = useState(false);
  const [skip, setSkip] = useState(0);
  const [fetchChat, fetchChatResponse] = useLazyViewChatQuery();
  const [createChat, createChatResponse] = useCreateChatMutation();
  const { user } = useAppSelector((state) => state.auth);
  const styles = useStyles();
  const { socket } = useSocketContext();

  useEffect(() => {
    const appendLatestMessage = async (id: string) => {
      let sskip = skip;
      let lastMessage;

      while (true) {
        const chat = await fetchChat({
          receiverId: id,
          skip: String(sskip),
        }).unwrap();

        if (chat.data.length > 0) {
          lastMessage = chat.data[chat.data.length - 1];
          break;
        }

        sskip = sskip - 20;
      }

      setSkip(sskip + 20);

      const mappedObject: IMessage = {
        _id: lastMessage.id,
        text: lastMessage.message,
        createdAt: new Date(lastMessage.timestamp),
        user: {
          _id: lastMessage.receiver.id,
          name: lastMessage.receiver.username,
          avatar: lastMessage.receiver.profilePic,
        },
      };

      setMessages((prev) => [mappedObject, ...prev]);
    };

    if (socket?.connected) {
      socket.on("new-message", appendLatestMessage);

      return () => {
        socket.off("new-message", appendLatestMessage);
      };
    }

    return () => {};
  }, [skip]);

  useEffect(() => {
    if (!user) return;

    const getChat = async () => {
      try {
        let ch = [];
        let sskip = 0;

        while (true) {
          const chats = await fetchChat({
            receiverId,
            skip: String(sskip),
          }).unwrap();

          if (!!!chats.data.length) {
            break;
          }

          ch.push(...chats.data);
          sskip = sskip + 20;
        }

        setSkip(sskip);
        const copy = ch.reverse();
        const isSender = copy[0].sender.id === user.id;

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
        setIsReady(true);
      } catch (e) {
        console.log({ e });
      }
    };
    getChat();
  }, []);

  // useEffect(() => {
  //   if (!isLoading && !!data?.data.length && isSuccess && user) {
  //     const copy = [...data.data].reverse(); // make newest 0
  //     const isSender = copy[0].sender.id === user.id;
  //     // const swapped = copy.map(i => ({
  //     //   ...i,
  //     //   receiver: i.receiver.id
  //     // }))

  //     const aaa = {
  //       receiver: {
  //         ...copy[0].receiver,
  //         profilePic: "",
  //         hobbies: "",
  //         movies: "",
  //         music: "",
  //         bio: "",
  //       },
  //       sender: {
  //         ...copy[0].sender,
  //         profilePic: "",
  //         hobbies: "",
  //         movies: "",
  //         music: "",
  //         bio: "",
  //       },
  //     };

  //     // console.log(
  //     //   `

  //     //   `,
  //     //   { sender: aaa.sender },
  //     //   `

  //     //   `,
  //     //   {
  //     //     receiver: aaa.receiver,
  //     //   },
  //     //   `

  //     //   `,
  //     //   { user: user.id, receiverId, msgId: copy[0].id },
  //     //   `

  //     //   `
  //     // );

  //     if (isSender) {
  //       logger("chat", `i am sender, ${user.id}`);
  //       logger("chat", `receiver id, ${aaa.receiver.id}`);
  //     } else {
  //       logger("chat", `i am receiver, ${user?.id}`);
  //       logger("chat", `sender id, ${aaa.sender.id}`);
  //     }
  //     logger("chat", `the message: ${copy[0].message}`);

  //     const mappedObject: IMessage[] = copy.map((i) => ({
  //       _id: i.id,
  //       text: i.message,
  //       createdAt: new Date(i.timestamp),
  //       user: {
  //         _id: isSender ? i.sender.id : i.receiver.id,
  //         name: isSender ? i.sender.username : i.receiver.username,
  //         avatar: isSender ? i.sender.profilePic : i.receiver.profilePic,
  //       },
  //     }));
  //     setMessages(mappedObject);
  //   }
  // }, [data]);

  if (fetchChatResponse.isError) {
    return null;
  }

  if (fetchChatResponse.isLoading || !isReady) {
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
