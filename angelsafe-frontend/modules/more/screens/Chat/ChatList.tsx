import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ListItem, Text } from "@rneui/themed";
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

type Props = {};

const ChatList = ({
  navigation,
  route,
}: StackScreenProps<ChatParamsList, "ChatList">) => {
  // const { data, error, isLoading } = useGetChatListQuery();
  const { user } = useAppSelector((state) => state.auth);
  const bottomTab = useBottomTabBarHeight();

  const handleProfilePress = () => {
    // navigation.navigate("Ch")
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   console.log({ error });
  // }

  // if (data && user?.username) {

  const handlePreviewPress = () => {
    navigation.navigate("ChatInterface", {
      id: "123",
    });
  };

  const styles = makeStyles({
    // minHeight: 800,
    tabBarHeight: bottomTab / 1.5,
  });

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <View style={styles.header}>
        <Text h2>{user?.username}</Text>
        <View style={{ flexDirection: "row" }}>
          <SearchIcon style={{ marginRight: 20 }} />
          <TouchableOpacity onPress={handleProfilePress}>
            <Avatar
              source={{
                uri: "https://xsgames.co/randomusers/avatar.php?g=male",
              }}
              size={45}
              rounded
            />
          </TouchableOpacity>
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
            <AvatarChat onPress={() => console.log(1)} />
            <AvatarChat />
            <AvatarChat />
            <AvatarChat />
            <AvatarChat />
            <AvatarChat />
          </ScrollView>
          <View style={styles.chatListContainer}>
            <ChatPreview icon={{}} label="asdf" onPress={handlePreviewPress} />
            <ChatPreview icon={{}} label="asdf" onPress={handlePreviewPress} />
            <ChatPreview icon={{}} label="asdf" onPress={handlePreviewPress} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
  // }

  return null;
};

export default ChatList;

const makeStyles = (args: { [key: string]: any }) =>
  StyleSheet.create({
    container: {
      padding: StyleConstants.PADDING_HORIZONTAL,
      paddingBottom: 0,
      flex: 1,
    },
    contentContainer: {},
    scrollViewContainer: {
      paddingBottom: args.tabBarHeight,
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
      borderBottomColor: "#ccc",
      paddingBottom: 12,
      // flex: 1,
    },
    chatListContainer: {
      backgroundColor: "#F3FBFF",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingVertical: 12,
      minHeight: 600,
      // height: "100%",
    },
  });
