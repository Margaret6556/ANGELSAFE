import { View } from "react-native";
import React from "react";
import { makeStyles, Text } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { ChatParamsList } from "@/more/types";
import { ScrollView } from "react-native-gesture-handler";
import { useGetChatListQuery } from "@/shared/api/chat";
import { useAppSelector } from "@/shared/hooks";
import { ErrorText, Loading, SearchIcon } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import ChatPreview from "@/more/components/Chat/List/CardPreview";
import AvatarChat from "@/more/components/Chat/List/Avatar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import useDarkMode from "@/shared/hooks/useDarkMode";

const ChatList = ({
  navigation,
}: StackScreenProps<ChatParamsList, "ChatList">) => {
  const { data, error, isLoading, isError } = useGetChatListQuery();
  const { user } = useAppSelector((state) => state.auth);
  const bottomTab = useBottomTabBarHeight();
  const isDark = useDarkMode();
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

  if (data?.data) {
    return (
      <View style={[styles.container, { paddingHorizontal: 0 }]}>
        <View style={styles.header}>
          <Text>{user?.username}</Text>
          <View style={{ flexDirection: "row" }}>
            {/* <SearchIcon /> */}
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
              {data.data.map((i) => {
                if (i.receiver) {
                  return (
                    <AvatarChat
                      key={i.receiver.id}
                      profilePicture={i.receiver.profilePic ?? "1"}
                      onPress={handleChatPerson({ ...i.receiver })}
                    />
                  );
                }
              })}
            </ScrollView>
            <View style={styles.chatListContainer}>
              {data.data.length > 0 ? (
                data.data.map((i) => {
                  if (i.receiver) {
                    return (
                      <ChatPreview
                        key={i.id}
                        {...i}
                        onPress={handleChatPerson({ ...i.receiver })}
                      />
                    );
                  }
                })
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

  return <Loading />;
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
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey4,
      paddingBottom: 12,
    },
    chatListContainer: {
      backgroundColor: props.isDark ? theme.colors.grey5 : "#F3FBFF",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingVertical: 12,
      minHeight: 600,
    },
  })
);
