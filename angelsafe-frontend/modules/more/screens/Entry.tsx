import React from "react";
import { View, StyleSheet } from "react-native";
import { makeStyles, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { MoreParamsList } from "../types";
import SettingsComponent from "../components/Settings";
import GroupChatComponent from "../components/GroupChats";
import ResourcesComponent from "../components/Resources";
import { StackScreenProps } from "@react-navigation/stack";

const EntryScreen = ({
  navigation,
}: StackScreenProps<MoreParamsList, "Entry">) => {
  const styles = useStyles();
  return (
    <Container
      type="scroll"
      containerProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.wrapper,
      }}
    >
      <View style={styles.container}>
        <Text>Resources</Text>
        <ResourcesComponent />
      </View>
      <View style={styles.container}>
        <Text>Settings</Text>
        <SettingsComponent />
      </View>
      <View style={styles.container}>
        <Text>Group chats</Text>
        <GroupChatComponent />
      </View>
    </Container>
  );
};

export default EntryScreen;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    justifyContent: "flex-start",
  },
  container: {
    width: "100%",
    marginBottom: theme.spacing.lg,
  },
}));
