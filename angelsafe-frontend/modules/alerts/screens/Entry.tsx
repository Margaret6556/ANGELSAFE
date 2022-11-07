import React from "react";
import { View, TouchableOpacity } from "react-native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { Container, Loading } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { AlertParamsList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar } from "@rneui/base";
import { FlatList } from "react-native-gesture-handler";
import { useGetNotificationsListQuery } from "@/shared/api/alerts";
import { CompositeScreenProps } from "@react-navigation/native";
import timeSince from "@/shared/utils/timeSince";
import { RootStackParamList } from "@/shared/types";

const EntryScreen = ({
  navigation,
}: CompositeScreenProps<
  StackScreenProps<AlertParamsList, "Entry">,
  StackScreenProps<RootStackParamList>
>) => {
  const { data, isLoading } = useGetNotificationsListQuery();
  const styles = useStyles();
  const { theme } = useTheme();

  const handleNavigate = (id: string) => () => {
    navigation.navigate("App", {
      screen: "Groups",
      params: {
        screen: "GroupDetails",
        params: {
          screen: "Details",
          params: {
            id,
          },
        },
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const { data: notifs } = data;

    return (
      <Container
        containerProps={{
          style: styles.wrapper,
        }}
      >
        <View style={styles.title}>
          <Text h4>Invitations/Groups</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={notifs}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 50 }} />}
            renderItem={({ item }) => {
              const textStyles = !!!item.read
                ? {
                    fontFamily: "nunitoBold",
                    color: theme.colors.primary,
                  }
                : {};
              return (
                <TouchableOpacity
                  onPress={handleNavigate(item.groupId)}
                  activeOpacity={0.5}
                >
                  <View style={styles.notification}>
                    <Avatar
                      source={{
                        uri: item.profilePic,
                      }}
                      containerStyle={styles.notificationIconContainer}
                      rounded
                      size={56}
                    />
                    <View style={styles.labels}>
                      <Text style={styles.since}>
                        {timeSince(item.timestamp)} ago
                      </Text>
                      <Text style={[styles.notificationText, textStyles]}>
                        {item.message}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Container>
    );
  }

  return null;
};

export default EntryScreen;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingHorizontal: 0,
    justifyContent: "flex-start",
    paddingBottom: 0,
  },
  title: {
    width: "100%",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingBottom: StyleConstants.PADDING_VERTICAL,
  },
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: StyleConstants.PADDING_HORIZONTAL * 2,
    borderTopRightRadius: StyleConstants.PADDING_HORIZONTAL * 2,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
    height: "100%",
    overflow: "hidden",
  },
  notification: {
    flexDirection: "row",
    // marginBottom: StyleConstants.PADDING_HORIZONTAL * 1.5,
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
    paddingVertical: 12,
  },
  notificationIcon: {},
  notificationIconContainer: {
    marginRight: StyleConstants.PADDING_HORIZONTAL / 2,
  },
  notificationText: {},
  labels: {},
  since: {
    fontSize: 12,
    color: theme.colors.grey1,
  },
}));
