import React from "react";
import { PostsType } from "@/shared/api/post";
import { Avatar, Card, Divider, makeStyles, Text } from "@rneui/themed";
import { ErrorText, Loading } from "@/shared/components";
import { useGetSingleGroupQuery } from "@/shared/api/groups";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/shared/types";
import { View } from "react-native";
import MyPostsPlaceholder from "../Skeleton/MyPostsPlaceholder";
import { PartialGroupsType } from "@/groups/types";
import { moderateScale, scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

const PostCard = (props: PostsType) => {
  const navigate = useNavigation<NavigationProp<RootStackParamList, "App">>();
  const styles = useStyles();
  const { data, isError, error, isLoading } = useGetSingleGroupQuery(
    props.groupId
  );

  const handlePress = (params: PartialGroupsType) => () => {
    navigate.navigate("App", {
      initial: true,
      screen: "Groups",
      params: {
        initial: false,
        screen: "GroupDetails",
        params: {
          screen: "Details",
          params,
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
      <TouchableOpacity
        onPress={handlePress({
          id: props.groupId,
        })}
      >
        <View style={styles.avatarWrapper}>
          <Avatar
            source={{ uri: data?.data.profilePic }}
            containerStyle={styles.avatarContainer}
            size={scale(32)}
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
    borderRadius: sizing.BORDER_RADIUS,
    borderColor: "transparent",
  },
  divider: {
    marginVertical: theme.spacing.md,
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarContainer: {
    marginRight: theme.spacing.md,
  },
  title: {
    fontFamily: "nunitoBold",
    color: theme.colors.primary,
  },
  date: {
    fontSize: sizing.FONT.xs,
    color: theme.colors.grey1,
  },
  noPost: {
    color: theme.colors.grey0,
  },
}));
