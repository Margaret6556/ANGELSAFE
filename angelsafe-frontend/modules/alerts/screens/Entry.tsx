import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { StyleConstants } from "@/shared/styles";
import { AlertParamsList, AlertScreenProps } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar } from "@rneui/base";
import { FlatList } from "react-native-gesture-handler";

const EntryScreen = ({
  navigation,
}: StackScreenProps<AlertParamsList, "Entry">) => {
  return (
    <Container
      containerProps={{
        style: styles.wrapper,
      }}
    >
      <View style={styles.title}>
        <Text>Invitation/Groups</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={alerts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.notification}>
                <Avatar
                  source={{
                    uri: "https://xsgames.co/randomusers/avatar.php?g=pixel",
                  }}
                  containerStyle={styles.notificationIconContainer}
                  rounded
                />
                <Text style={styles.notificationText}>{item.label}</Text>
              </View>
            );
          }}
        />
      </View>
    </Container>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    justifyContent: "flex-start",
    paddingBottom: 0,
  },
  title: {
    width: "100%",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingBottom: StyleConstants.PADDING_VERTICAL,
    // flex: 1,
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: StyleConstants.PADDING_HORIZONTAL * 2,
    borderTopRightRadius: StyleConstants.PADDING_HORIZONTAL * 2,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: 4,
    overflow: "hidden",
  },
  notification: {
    flexDirection: "row",
    marginBottom: StyleConstants.PADDING_HORIZONTAL * 1.5,
    alignItems: "center",
  },
  notificationIcon: {},
  notificationIconContainer: {
    width: "10%",
  },
  notificationText: {
    width: "90%",
    paddingLeft: 12,
  },
});

const alerts = [
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
  {
    type: "invite",
    id: `invite-${Math.random()}`,
    label:
      "2154.green.cherry invited you to join Asthma and Allergies. join Asthma and Allergies.join Asthma and Allergies.",
  },
];
