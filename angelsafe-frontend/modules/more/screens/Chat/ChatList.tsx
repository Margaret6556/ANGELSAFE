import { Animated, FlatList, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { ChatParamsList } from "@/more/types";
import { useGetChatListQuery } from "@/shared/api/chat";
import { useAppSelector } from "@/shared/hooks";
import { ErrorText, SearchIcon } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import ChatPreview from "@/more/components/Chat/List/CardPreview";
import AvatarChat from "@/more/components/Chat/List/Avatar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ChatListMessagePlaceholder from "@/more/components/Skeleton/ChatListMessagePlaceholder";
import ChatListAvatarPlaceholder from "@/more/components/Skeleton/ChatListAvatarPlaceholder";
import useIsDark from "@/shared/hooks/useIsDark";
import { moderateScale, scale } from "react-native-size-matters";

const ChatList = ({
  navigation,
}: StackScreenProps<ChatParamsList, "ChatList">) => {
  const { data, error, isError, isLoading } = useGetChatListQuery();
  const { user } = useAppSelector((state) => state.auth);
  const bottomTab = useBottomTabBarHeight();
  const isDark = useIsDark();
  const animation = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const styles = useStyles({
    tabBarHeight: bottomTab / 1.5,
    isDark,
  });

  if (isError || error) {
    return <ErrorText />;
  }

  const handleChatPerson =
    ({ id, profilePic, username }: ChatParamsList["ChatInterface"]) =>
    () => {
      navigation.navigate("ChatInterface", {
        id,
        profilePic,
        username,
      });
    };

  const chats = data?.data || [];
  const a = chats.map((i) => ({
    ...i.receiver,
    profilePic: "",
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{user?.username}</Text>
        {/* <View style={{ flexDirection: "row" }}>
          <SearchIcon />
        </View> */}
      </View>
      <Animated.FlatList
        data={chats}
        horizontal
        contentContainerStyle={styles.scrollView}
        style={[
          {
            opacity: animation.interpolate({
              inputRange: [0, 70],
              outputRange: [1, 0],
            }),
          },
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, -50],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
        renderItem={({ item }) => {
          if (item.receiver) {
            return (
              <AvatarChat
                key={item.receiver.id}
                profilePicture={item.receiver.profilePic ?? "1"}
                onPress={handleChatPerson({ ...item.receiver })}
              />
            );
          }

          return null;
        }}
        ListFooterComponent={() =>
          isLoading ? (
            <View
              style={{
                paddingLeft: theme.spacing.md,
                flexDirection: "row",
                width: scale(64),
              }}
            >
              {new Array(4).fill(0).map((_, idx) => (
                <ChatListAvatarPlaceholder key={idx} />
              ))}
            </View>
          ) : null
        }
      />
      <Animated.FlatList
        data={chats}
        bounces={chats.length > 1}
        style={[
          styles.chatListContainer,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, moderateScale(100)],
                  outputRange: [0, moderateScale(-80)],
                  extrapolate: "clamp",
                }),
              },
            ],
            borderRadius: animation.interpolate({
              inputRange: [0, moderateScale(100)],
              outputRange: [moderateScale(50), 0],
              extrapolate: "clamp",
            }),
          },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: animation },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={({ item }) => {
          return (
            <>
              {item.receiver && (
                <ChatPreview
                  key={item.id}
                  {...item}
                  onPress={handleChatPerson({ ...item.receiver })}
                />
              )}
              <Divider />
            </>
          );
        }}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {isLoading &&
              new Array(40).fill(0).map((_, idx) => (
                <View key={idx} style={styles.placeholderWrapper}>
                  <ChatListMessagePlaceholder />
                  <Divider style={{ paddingVertical: 4 }} />
                </View>
              ))}
          </View>
        )}
      />
    </View>
  );
};

export default ChatList;

const useStyles = makeStyles(
  (theme, props: { tabBarHeight: number; isDark: boolean }) => ({
    container: {
      padding: theme.spacing.lg,
      paddingBottom: 0,
      paddingHorizontal: 0,
    },
    scrollView: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xl,
      justifyContent: "center",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: theme.spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.grey0,
      paddingBottom: theme.spacing.md,
    },
    chatListContainer: {
      backgroundColor: props.isDark ? theme.colors.grey5 : "#F3FBFF",
      paddingVertical: theme.spacing.md,
      height: "100%",
    },
    placeholderWrapper: {
      padding: theme.spacing.md,
    },
    footer: {
      padding: theme.spacing.sm,
      paddingBottom: 200,
    },
  })
);
