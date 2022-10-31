import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ListItem, makeStyles, Text } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { ChatParamsList } from "@/more/types";
import { ScrollView } from "react-native-gesture-handler";
import { useGetChatListQuery } from "@/shared/api/chat";
import { useAppSelector } from "@/shared/hooks";
import { Loading, SearchIcon } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { Avatar } from "@rneui/base";
import ChatPreview from "@/more/components/Chat/List/CardPreview";
import AvatarChat from "@/more/components/Chat/List/Avatar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ProfileParamsList } from "@/profile/types";
import useDarkMode from "@/shared/hooks/useDarkMode";

type Props = {};

const ChatList = ({
  navigation,
  route,
}: StackScreenProps<ChatParamsList, "ChatList">) => {
  const { data, error, isLoading } = useGetChatListQuery();
  const { user } = useAppSelector((state) => state.auth);
  const bottomTab = useBottomTabBarHeight();
  const isDark = useDarkMode();
  const styles = useStyles({
    tabBarHeight: bottomTab / 1.5,
    isDark,
  });

  const handleProfilePress = () => {
    // navigation.navigate;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return null;
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

  if (data?.data) {
    return (
      <View style={[styles.container, { paddingHorizontal: 0 }]}>
        <View style={styles.header}>
          <Text>{user?.username}</Text>
          <View style={{ flexDirection: "row" }}>
            <SearchIcon />
            {/* <TouchableOpacity onPress={handleProfilePress}>
              <Avatar
                source={{
                  uri: user?.profilePic,
                }}
                size={45}
                rounded
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
          >
            <ScrollView
              horizontal
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
            >
              {data.data.map(({ receiver }) => (
                <AvatarChat
                  key={receiver.id}
                  profilePicture={receiver.profilePic}
                  onPress={handleChatPerson({ ...receiver })}
                />
              ))}
            </ScrollView>
            <View style={styles.chatListContainer}>
              {data.data.length > 0 ? (
                data.data.map((i) => (
                  <ChatPreview
                    key={i.id}
                    {...i}
                    onPress={handleChatPerson({ ...i.receiver })}
                  />
                ))
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text>No messages yet</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ color: "red" }}>Error</Text>
    </View>
  );
};

export default ChatList;

const useStyles = makeStyles(
  (theme, props: { tabBarHeight: number; isDark: boolean }) => ({
    container: {
      padding: StyleConstants.PADDING_HORIZONTAL,
      paddingBottom: 0,
      flex: 1,
    },
    contentContainer: {},
    scrollViewContainer: {
      paddingBottom: props.tabBarHeight,
      justifyContent: "space-between",
    },
    scrollView: {
      marginVertical: StyleConstants.PADDING_VERTICAL,
      // flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey4,
      paddingBottom: 12,
      // flex: 1,
    },
    chatListContainer: {
      backgroundColor: props.isDark ? theme.colors.grey5 : "#F3FBFF",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingVertical: 12,
      minHeight: 600,
      // height: "100%",
    },
  })
);
