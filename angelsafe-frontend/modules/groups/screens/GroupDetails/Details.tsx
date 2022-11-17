import React, { useEffect, useRef, useState } from "react";
import { View, Alert, Animated, StyleSheet } from "react-native";
import { Button, Icon, makeStyles, Text, useTheme } from "@rneui/themed";
import { Container } from "@/shared/components";
import { GroupDetailsParamList } from "../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { _API } from "@/shared/config";
import {
  useGetSingleGroupQuery,
  useJoinGroupMutation,
  useUnjoinGroupMutation,
} from "@/shared/api/groups";
import { TouchableOpacity } from "react-native-gesture-handler";
import GroupFeed from "../../components/Feed";
import logger from "@/shared/utils/logger";
import StatChart from "../../components/StatChart";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import GroupDetailPlaceholder from "@/groups/components/Skeleton/GroupDetailPlaceholder";
import { useAppSelector } from "@/shared/hooks";
import GroupDetailHeader from "@/groups/components/Header/GroupDetailHeader";
import { useGroupsContext } from "@/groups/components/GroupsContext";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

enum RenderView {
  FEED = 1,
  MOOD_CHART,
}

const GroupDetailsScreen = ({
  navigation,
  route,
}: StackScreenProps<GroupDetailsParamList, "Details">) => {
  useSetSolidBackground();
  const { description, profilePic } = route.params;
  const id = route.params.id!;
  const groupname = route.params.groupname!;
  const { user } = useAppSelector((state) => state.auth);
  const { data, isError, error } = useGetSingleGroupQuery(id);
  const [joinGroup] = useJoinGroupMutation();
  const [unjoinGroup] = useUnjoinGroupMutation();
  const { theme } = useTheme();
  const styles = useStyles({ isJoined: data?.data.joined || 0 });
  const animation = useRef(new Animated.Value(0)).current;
  const [containerTopHeight, setContainterTopHeight] = useState(0);
  const { handleSetGroupDetails } = useGroupsContext();
  const [view, setView] = useState(RenderView.FEED);

  useEffect(() => {
    if (data?.data) {
      handleSetGroupDetails(data.data);
    }
  }, [data?.data]);

  const handleGroupJoin = async () => {
    try {
      const { status } = await joinGroup({ groupId: id }).unwrap();
      logger("groups", { status });
    } catch (e) {
      logger("groups", { e });
    }
  };

  const showUnjoinAlert = (members: string) => async () => {
    if (+members === 1) {
      Alert.alert(
        "Confirm unjoin",
        "You are the only member left, group will be disbanded if you leave. Confirm?",
        [
          {
            onPress: async () => {
              await handleGroupUnjoin();
              return;
            },
            text: "Confirm",
            style: "destructive",
          },
          {
            onPress: () => {
              return;
            },
            style: "cancel",
            text: "Cancel",
          },
        ]
      );
    } else {
      handleGroupUnjoin();
    }
  };

  const handleGroupUnjoin = async () => {
    try {
      const { status } = await unjoinGroup({ groupId: id }).unwrap();
      logger("groups", { status });
    } catch (e) {
      logger("groups", { e });
    }
  };

  const handleSetView = (viewTab: RenderView) => () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setView(viewTab);
  };

  const handleMembersPress = (id: string) => () => {
    navigation.push("Members", {
      groupId: id,
    });
  };

  const handleNavigationBack = () => {
    navigation.goBack();
  };

  const handleEditGroup = () => {
    navigation.push("EditGroup", {
      groupname,
      profilePic,
      description,
      id,
    });
  };

  const renderView = () => {
    switch (view) {
      case RenderView.FEED: {
        return (
          <GroupFeed
            id={id}
            joined={data?.data.joined || 0}
            animation={animation}
          />
        );
      }
      case RenderView.MOOD_CHART: {
        return <StatChart groupId={id} animation={animation} />;
      }
      default:
        return null;
    }
  };

  if (isError) {
    if ("status" in error) {
      logger("groups", error.data.message);
    }
  }

  if (data) {
    const { data: group } = data;
    if (!user?.id) return null;

    return (
      <Container
        type="image"
        containerProps={{
          style: styles.wrapper,
          imageStyle: styles.imageContainer,
        }}
      >
        <GroupDetailHeader
          animation={animation}
          groupname={groupname}
          onNavigationBack={handleNavigationBack}
          profilePic={group.profilePic}
        />
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, containerTopHeight * 2],
                    outputRange: [0, -containerTopHeight],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={styles.containerTop}
            onLayout={(e) => {
              setContainterTopHeight(e.nativeEvent.layout.height);
            }}
          >
            <View style={styles.titleWrapper}>
              <Text h4 style={styles.title}>
                {group.groupname}
              </Text>
              {user.id === group.ownerId && (
                <TouchableOpacity onPress={handleEditGroup}>
                  <Icon
                    name="settings-sharp"
                    type="ionicon"
                    color={theme.colors.grey1}
                    size={moderateScale(24)}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.stats}>
              <TouchableOpacity
                onPress={handleMembersPress(id)}
                activeOpacity={0.5}
              >
                <Text style={styles.statsLabel}>{group.members} members</Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.statsLabel,
                  {
                    color:
                      group.online > 0
                        ? theme.colors.success
                        : theme.colors.primary,
                  },
                ]}
              >
                {group.online} online
              </Text>
              <Button
                title={group.joined ? "Joined" : "Join"}
                containerStyle={styles.joinButtonContainerStyle}
                buttonStyle={styles.joinButtonStyle}
                titleStyle={styles.joinButtonTitleStyle}
                onPress={
                  group.joined
                    ? showUnjoinAlert(group.members)
                    : handleGroupJoin
                }
                activeOpacity={0.5}
                {...(group.ownerId === user.id && {
                  disabled: true,
                  disabledStyle: {
                    borderColor: "transparent",
                  },
                })}
              />
            </View>
            <View style={styles.description}>
              <Text>{group.description}</Text>
            </View>
            <View style={styles.tab}>
              <TouchableOpacity
                onPress={handleSetView(RenderView.FEED)}
                containerStyle={styles.tabButton}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        view === RenderView.FEED
                          ? theme.colors.primary
                          : theme.colors.grey1,
                    },
                  ]}
                >
                  Feed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSetView(RenderView.MOOD_CHART)}
                containerStyle={styles.tabButton}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        view === RenderView.MOOD_CHART
                          ? theme.colors.primary
                          : theme.colors.grey1,
                    },
                  ]}
                >
                  Mood Chart
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerBottom}>{renderView()}</View>
        </Animated.View>
      </Container>
    );
  }
  return (
    <GroupDetailPlaceholder description={description} groupname={groupname} />
  );
};

export default GroupDetailsScreen;

const useStyles = makeStyles((theme, props: { isJoined: 0 | 1 }) => ({
  wrapper: {
    justifyContent: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor:
      theme.mode === "dark" ? theme.colors.background : "transparent",
  },
  imageContainer: {
    opacity: theme.mode === "dark" ? 0 : 1,
  },
  container: {
    minWidth: "100%",
  },
  containerTop: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderBottomLeftRadius: sizing.BORDER_RADIUS,
    borderBottomRightRadius: sizing.BORDER_RADIUS,
    shadowOffset: {
      height: theme.spacing.xs,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor:
      theme.mode === "dark" ? theme.colors.background : theme.colors.grey3,
  },
  title: {
    marginBottom: theme.spacing.md,
    color: theme.mode === "dark" ? theme.colors.black : theme.colors.primary,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statsLabel: {
    color: theme.mode === "dark" ? theme.colors.black : theme.colors.primary,
    fontWeight: "300",
  },
  description: {
    marginVertical: theme.spacing.lg,
  },
  tab: {
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
  },
  tabText: {
    textAlign: "center",
    fontFamily: "nunitoBold",
  },
  containerBottom: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xs,
  },
  joinButtonContainerStyle: {
    paddingHorizontal: 0,
    margin: 0,
  },
  joinButtonStyle: {
    backgroundColor: !!props.isJoined ? "transparent" : theme.colors.secondary,
    paddingHorizontal: 0,
    height: moderateScale(28),
    minWidth: moderateScale(80),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: !!props.isJoined
      ? theme.colors.primary
      : theme.colors.secondary,
    padding: 0,
    margin: 0,
  },
  joinButtonTitleStyle: {
    color: !!props.isJoined ? theme.colors.primary : theme.colors.white,
    fontSize: moderateScale(14),
  },
}));
