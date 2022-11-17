import React from "react";
import { useGetMyPostsQuery } from "@/shared/api/post";
import { makeStyles, Text } from "@rneui/themed";
import { ErrorText } from "@/shared/components";
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
  noPost: {
    color: theme.colors.grey0,
  },
}));
