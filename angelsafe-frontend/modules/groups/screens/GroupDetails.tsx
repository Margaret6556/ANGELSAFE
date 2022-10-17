import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Badge, Button, Icon, Image, Input, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { GroupParamsList } from "../types";

import { StackScreenProps } from "@react-navigation/stack";
import { Card } from "../components";
import Modal from "react-native-modal";

type GroupType = {
  id: number;
  title: string;
  description: string;
  members: string;
  online: number;
};

const groups: GroupType[] = [
  {
    id: 1,
    title: "Stage IV Prostate Cancer",
    description:
      "Welcome to Stage IV Prostate Cancer group. Here you can find support through your journey by meeting with others in the same position as you.",
    members: "4.4k",
    online: 30,
  },
];

const GroupDetailsScreen = ({
  navigation,
  route,
}: StackScreenProps<GroupParamsList, "GroupDetails">) => {
  const [group, setGroup] = useState<GroupType>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params.id) {
      const found = groups.find((i) => i.id === route.params.id);
      if (found) {
        setGroup(found);
      }
    }
  }, [route.params.id]);

  const handleNewPost = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Container
      type="scroll"
      containerProps={{
        contentContainerStyle: styles.wrapper,
      }}
    >
      {group ? (
        <>
          <View style={styles.container}>
            <View style={styles.containerTop}>
              <Text h4 style={styles.title}>
                {group.title}
              </Text>
              <View style={styles.stats}>
                <Text>{group.members} members</Text>
                <Text>{group.online} online</Text>
                <Button title="Join" size="sm" />
              </View>
              <View style={styles.description}>
                <Text>{group.description}</Text>
              </View>
              <View style={styles.tab}>
                <Text>Feed</Text>
                <Text>Symptom Chart</Text>
              </View>
            </View>

            <View style={styles.containerBottom}>
              <Button title="Type your thoughts..." onPress={handleNewPost} />
              <Card description="Stay strong everyone. It’s tough but we have a 29% chance of surviving this! Somehow I have managed to live a year after the doctors told me I had less than 4 months to go." />
              <Card description="Finally reached stage 4. I am still processing all my emotions and haven’t told my family yet. Does anyone have any tips on how to inform family members and deal with what the future " />
              <Card description="Stay strong everyone. It’s tough but we have a 29% chance of surviving this! Somehow I have managed to live a year after the doctors told me I had less than 4 months to go." />
            </View>
            <Modal
              isVisible={modalVisible}
              style={styles.modalContainer}
              onBackdropPress={handleNewPost}
            >
              <View style={styles.modalWrapper}>
                <Text>hello</Text>
              </View>
            </Modal>
          </View>
        </>
      ) : (
        <Text>Missing</Text>
      )}
    </Container>
  );
};

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    width: "100%",
  },
  containerTop: {
    backgroundColor: "#fff",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
    borderBottomLeftRadius: StyleConstants.PADDING_HORIZONTAL,
    borderBottomRightRadius: StyleConstants.PADDING_HORIZONTAL,
  },
  title: {
    marginBottom: 12,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    marginVertical: 24,
  },
  tab: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerBottom: {
    padding: StyleConstants.PADDING_HORIZONTAL,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    borderRadius: 10,
  },
  input: {
    height: 32,
    borderColor: "#A0A0A0",
    borderWidth: 1,
  },
  cardWrapper: {
    backgroundColor: "red",
    minHeight: 265,
  },
  cardContainer: {
    backgroundColor: "yellow",
    borderRadius: StyleConstants.PADDING_HORIZONTAL / 2,
    marginHorizontal: 0,
  },
  modalContainer: {
    margin: 0,
    width: "100%",
  },
  modalWrapper: {
    width: "100%",
    marginTop: "auto",
    height: "80%",
    backgroundColor: "#dedede",
    justifyContent: "space-between",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
});
