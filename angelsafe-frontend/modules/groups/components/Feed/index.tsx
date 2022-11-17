import React, { useState } from "react";
import { Animated, Dimensions, View } from "react-native";
import { Button, makeStyles, Text } from "@rneui/themed";
import Card from "../Card";
import { useGetPostListQuery } from "@/shared/api/post";
import AddPost from "../AddPost";
import { StyleConstants } from "@/shared/styles";
import PostsPlaceholder from "../Skeleton/PostsPlaceholder";
import { GroupDetailsType } from "@/groups/types";

interface GroupFeedProps extends Pick<GroupDetailsType, "joined" | "id"> {
  animation: Animated.Value;
}

const GroupFeed = (props: GroupFeedProps) => {
  const { data, isError } = useGetPostListQuery({ groupId: props.id });
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const handleNewPost = () => {
    setModalVisible(!modalVisible);
  };

  if (isError) {
    return null;
  }

  if (data) {
    const { data: posts } = data;
    return (
      <>
        <Animated.FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: props.animation,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          ListHeaderComponent={
            !!props.joined ? (
              <Button
                title="Type your thoughts..."
                onPress={handleNewPost}
                containerStyle={styles.thoughtsButton}
              />
            ) : (
              <Text style={styles.joinText}>Join the group to add a post</Text>
            )
          }
          renderItem={({ item }) => {
            return <Card {...item} />;
          }}
          ListFooterComponent={
            <View
              style={{ paddingBottom: Dimensions.get("screen").height / 2 }}
            />
          }
        />
        <AddPost
          groupId={props.id}
          onClose={handleNewPost}
          isVisible={modalVisible}
        />
      </>
    );
  }

  return <PostsPlaceholder />;
};

export default GroupFeed;

const useStyles = makeStyles((theme) => ({
  thoughtsButton: {
    marginVertical: StyleConstants.PADDING_VERTICAL,
  },
  modalContainer: {
    margin: 0,
    width: "100%",
  },
  joinText: {
    textAlign: "center",
    marginVertical: StyleConstants.PADDING_VERTICAL,
    color: theme.colors.grey0,
  },
}));
