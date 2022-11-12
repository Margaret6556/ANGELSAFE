import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed";
import { Container, Loading } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { AlertParamsList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar } from "@rneui/base";
import { useGetNotificationsListQuery } from "@/shared/api/alerts";
import { CompositeScreenProps } from "@react-navigation/native";
import timeSince from "@/shared/utils/timeSince";
import { RootStackParamList } from "@/shared/types";
import ChatListMessagePlaceholder from "@/more/components/Skeleton/ChatListMessagePlaceholder";

const EntryScreen = ({
  navigation,
}: CompositeScreenProps<
  StackScreenProps<AlertParamsList, "Entry">,
  StackScreenProps<RootStackParamList>
>) => {
  const animation = useRef(new Animated.Value(0)).current;
  const { data, isLoading } = useGetNotificationsListQuery();
  const styles = useStyles();
  const { theme } = useTheme();
  const notifs = data?.data || [];

  const handleNavigate = (id: string) => () => {
    navigation.navigate("App", {
      screen: "Groups",
      initial: true,
      params: {
        screen: "GroupDetails",
        initial: false,
        params: {
          screen: "Details",
          params: {
            id,
          },
          initial: false,
        },
      },
    });
  };

  return (
    <Container
      containerProps={{
        style: styles.wrapper,
      }}
    >
      <Animated.View
        style={[
          styles.title,
          {
            opacity: animation.interpolate({
              inputRange: [0, 75],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, -100],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <Text h4>Invitations/Groups</Text>
      </Animated.View>

      <Animated.FlatList
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -69],
                  extrapolate: "clamp",
                }),
              },
            ],
            borderRadius: animation.interpolate({
              inputRange: [0, 100],
              outputRange: [24, 0],
              extrapolate: "clamp",
            }),
          },
        ]}
        data={notifs}
        bounces={notifs.length > 1}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animation,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
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
                  <Text style={textStyles}>{item.message}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View style={{ paddingBottom: 100 }}>
            {isLoading && (
              <>
                {new Array(8).fill(0).map((_, idx) => (
                  <View style={{ paddingVertical: 4 }} key={idx}>
                    <View style={{ paddingHorizontal: 12 }}>
                      <ChatListMessagePlaceholder />
                    </View>
                    <Divider style={{ marginVertical: 8 }} />
                  </View>
                ))}
              </>
            )}
          </View>
        }
      />
    </Container>
  );
};

export default EntryScreen;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingHorizontal: 0,
    justifyContent: "flex-start",
    paddingVertical: 0,
    flex: 0,
  },
  title: {
    width: "100%",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
    height: "100%",
  },
  notification: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.grey0,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  notificationIconContainer: {
    width: "16%",
    marginRight: "2%",
  },
  labels: { width: "82%" },
  since: {
    fontSize: 12,
    color: theme.colors.grey1,
  },
}));
