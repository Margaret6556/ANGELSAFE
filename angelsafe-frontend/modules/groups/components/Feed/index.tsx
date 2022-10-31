import React, { useState } from "react";
import { View } from "react-native";
import { Button, makeStyles, Text } from "@rneui/themed";
import Card from "../Card";
import { useGetPostListQuery } from "@/shared/api/post";
import Modal from "react-native-modal";
import AddPost from "../AddPost";
import { StyleConstants } from "@/shared/styles";

interface GroupFeedProps {
  groupId: string;
  isJoined: boolean;
}

const GroupFeed = ({ groupId, isJoined }: GroupFeedProps) => {
  const { data, isError } = useGetPostListQuery({ groupId });
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const handleNewPost = () => {
    setModalVisible(!modalVisible);
  };

  if (isError) {
    return null;
  }

  if (data) {
    const reversed = [...data.data].reverse();
    return (
      <>
        <View>
          {isJoined ? (
            <Button
              title="Type your thoughts..."
              onPress={handleNewPost}
              style={styles.thoughtsButton}
            />
          ) : (
            <Text style={styles.joinText}>Join the group to add a post</Text>
          )}

          {reversed.map((args) => (
            <Card key={args.id} {...args} />
          ))}
        </View>
        <Modal
          isVisible={modalVisible}
          style={styles.modalContainer}
          onBackdropPress={handleNewPost}
        >
          <AddPost onClose={handleNewPost} groupId={groupId} />
        </Modal>
      </>
    );
  }

  return null;
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
