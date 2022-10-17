import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { StyleConstants } from "@/shared/styles";
import { MoreParamsList, MoreScreenProps } from "../types";
import { ListComponent } from "../components";
import { resources, groupChats, settings } from "../data";
import { logout } from "@/shared/state/reducers/auth/actions";

const EntryScreen = ({
  navigation,
}: MoreScreenProps<MoreParamsList, "Entry">) => {
  const dispatch = useAppDispatch();

  const settingsList = settings.map((i) => {
    if (i.label.toLocaleLowerCase() === "logout") {
      return {
        ...i,
        onPress: () => {
          showAlert();
        },
      };
    }
    return i;
  });

  const showAlert = () =>
    Alert.alert(
      "Log out of AngelSafe?",
      "",
      [
        {
          text: "Log out",
          onPress: async () => {
            dispatch(logout());
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

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
        <ListComponent list={resources} />
      </View>
      <View style={styles.container}>
        <Text>Settings</Text>
        <ListComponent list={settingsList} />
      </View>
      <View style={styles.container}>
        <Text>Group chats</Text>
        <ListComponent list={groupChats} />
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
