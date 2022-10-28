import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text, Button, makeStyles } from "@rneui/themed";
import Card from "../Card";
import { useGetPostListQuery } from "@/shared/api/post";
import Modal from "react-native-modal";
import { Loading } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import AddPost from "../AddPost";

interface GroupFeedProps {
  groupId: string;
}

const GroupFeed = ({ groupId }: GroupFeedProps) => {
  const { data, isError, isLoading, error } = useGetPostListQuery({ groupId });
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const handleNewPost = () => {
    setModalVisible(!modalVisible);
  };

  if (isError) {
    console.log({ error });
    return null;
  }

  if (data) {
    console.log(data.data[0]);
    const reversed = [...data.data].reverse();
    return (
      <>
        <View>
          <Button
            title="Type your thoughts..."
            onPress={handleNewPost}
            style={styles.thoughtsButton}
          />

          {reversed.map(({ id, message, comments, likes, hearts, ownerId }) => (
            <Card
              key={id}
              description={message}
              ownerId={ownerId}
              socials={{
                comments,
                likes,
                hearts,
              }}
            />
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

const useStyles = makeStyles({
  thoughtsButton: {
    marginVertical: 12,
  },
  modalContainer: {
    margin: 0,
    width: "100%",
  },
});
