import React from "react";
import { PostsType, useGetMyPostsQuery } from "@/shared/api/post";
import { Avatar, Card, Divider, makeStyles, Text } from "@rneui/themed";
import { ErrorText, Loading } from "@/shared/components";
import { useGetSingleGroupQuery } from "@/shared/api/groups";
import { StyleConstants } from "@/shared/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppTabParamList } from "@/shared/types";
import { View } from "react-native";
import MyPostsPlaceholder from "../Skeleton/MyPostsPlaceholder";

const PostCard = (props: PostsType) => {
  const navigate = useNavigation<NavigationProp<AppTabParamList, "Groups">>();
  const styles = useStyles();
  const { data, isError, error, isLoading } = useGetSingleGroupQuery(
    props.groupId
  );

  const handlePress = (id: string) => () => {
    navigate.navigate("Groups", {
      screen: "GroupDetails",
      params: {
        screen: "Details",
        params: {
          id,
        },
      },
    });
  };

  if (isError || error) {
    return <ErrorText />;
  }

  if (isLoading) {
    return <MyPostsPlaceholder />;
  }

  return (
    <Card containerStyle={styles.card}>
      <TouchableOpacity onPress={handlePress(props.groupId)}>
        <View style={styles.avatarWrapper}>
          <Avatar
            source={{ uri: data?.data.profilePic }}
            containerStyle={{ marginRight: 12 }}
            rounded
          />
          <View>
            <Text style={styles.title}>{data?.data.groupname}</Text>
            <Text style={styles.date}>
              {new Date(props.timestamp).toDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <Text>{props.message}</Text>
    </Card>
  );
};

export default PostCard;

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 0,
    borderRadius: 8,
    borderColor: "transparent",
  },
  divider: {
    marginVertical: 12,
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "nunitoBold",
    color: theme.colors.primary,
    lineHeight: 24,
  },
  date: {
    fontSize: 12,
    color: theme.colors.grey1,
  },
  noPost: {
    color: theme.colors.grey0,
  },
}));
