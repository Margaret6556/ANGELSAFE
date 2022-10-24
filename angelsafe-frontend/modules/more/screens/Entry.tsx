import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { MoreParamsList, MoreScreenProps } from "../types";
import { ListComponent } from "../components";
import { resources, groupChats, settings } from "../data";
import { useLazyLogoutQuery } from "@/shared/api/auth";
import { logout } from "@/shared/state/reducers/auth/actions";
import SettingsComponent from "../components/Settings";
import GroupChatComponent from "../components/GroupChats";
import ResourcesComponent from "../components/Resources";

const EntryScreen = ({
  navigation,
}: MoreScreenProps<MoreParamsList, "Entry">) => {
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

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-start",
    minHeight: 800,
  },
  container: {
    width: "100%",
    marginBottom: 24,
  },
});
