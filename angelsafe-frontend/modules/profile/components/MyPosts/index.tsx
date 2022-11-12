import React from "react";
import { useGetMyPostsQuery } from "@/shared/api/post";
import { makeStyles, Text } from "@rneui/themed";
import { ErrorText } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import PostCard from "./PostCard";
import MyPostsPlaceholder from "../Skeleton/MyPostsPlaceholder";

const MyPosts = () => {
  const styles = useStyles();
  const { isError, data, error } = useGetMyPostsQuery();

  if (isError || error) {
    return <ErrorText />;
  }

  if (data) {
    return (
      <>
        {!!data.data.length ? (
          [...data.data]
            .reverse()
            .map((args) => <PostCard key={args.id} {...args} />)
        ) : (
          <Text style={styles.noPost}>
            No posts yet, join a group to create one!
          </Text>
        )}
      </>
    );
  }

  return (
    <>
      <MyPostsPlaceholder />
      <MyPostsPlaceholder />
    </>
  );
};

export default MyPosts;

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 0,
    borderRadius: StyleConstants.PADDING_HORIZONTAL / 2,
  },
  divider: {
    marginVertical: 12,
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
