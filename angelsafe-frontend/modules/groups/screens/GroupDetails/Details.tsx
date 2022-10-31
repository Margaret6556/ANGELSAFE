import React, { useState } from "react";
import {
  View,
  StatusBar,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import { Button, lightColors, makeStyles, Text, useTheme } from "@rneui/themed";
import { Container, Loading } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { GroupDetailsParamList } from "../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { _API } from "@/shared/config";
import {
  useGetSingleGroupQuery,
  useJoinGroupMutation,
  useUnjoinGroupMutation,
} from "@/shared/api/groups";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import { TouchableOpacity } from "react-native-gesture-handler";
import GroupFeed from "../../components/Feed";
import useDarkMode from "@/shared/hooks/useDarkMode";
import logger from "@/shared/utils/logger";

const deviceHeight = Dimensions.get("screen").height;

enum RenderView {
  FEED = 1,
  SYMPTOM_CHART,
}

const GroupDetailsScreen = ({
  navigation,
  route,
}: StackScreenProps<GroupDetailsParamList, "Details">) => {
  const { id } = route.params;
  const { data, isError, error, isLoading } = useGetSingleGroupQuery(id);
  const [joinGroup] = useJoinGroupMutation();
  const [unjoinGroup] = useUnjoinGroupMutation();
  const [view, setView] = useState(RenderView.FEED);
  const [bounces, setBounces] = useState(false);
  const { theme } = useTheme();
  const isDark = useDarkMode();
  const styles = useStyles({ isDark, isJoined: data?.data.joined || 0 });

  useSetSolidBackground();

  const handleGroupJoin = async () => {
    try {
      const { status } = await joinGroup({ groupId: id }).unwrap();
      logger("groups", { status });
    } catch (e) {
      logger("groups", { e });
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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > deviceHeight - (deviceHeight - 200)) {
      setBounces(true);
    } else {
      setBounces(false);
    }
  };

  const handleSetView = (viewTab: RenderView) => () => {
    setView(viewTab);
  };

  const handleMembersPress = (id: string) => () => {
    navigation.push("Members", {
      groupId: id,
    });
  };

  const renderView = () => {
    switch (view) {
      case RenderView.FEED: {
        return <GroupFeed groupId={id} isJoined={!!data?.data.joined} />;
      }
      case RenderView.SYMPTOM_CHART: {
        return (
          <View style={{ marginVertical: 12 }}>
            <Text>Come back later, data not yet available.</Text>
          </View>
        );
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

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const { data: group } = data;

    return (
      <Container
        type="image"
        containerProps={{
          style: styles.wrapper,
          imageStyle: styles.imageContainer,
        }}
      >
        <Container
          type="scroll"
          containerProps={{
            contentContainerStyle: styles.wrapper,
            onScroll: handleScroll,
            scrollEventThrottle: 16,
            bounces: bounces,
            showsVerticalScrollIndicator: false,
          }}
        >
          <View style={styles.container}>
            <View style={styles.containerTop}>
              <Text h4 style={styles.title}>
                {group.groupname}
              </Text>
              <View style={styles.stats}>
                <TouchableOpacity
                  onPress={handleMembersPress(id)}
                  activeOpacity={0.5}
                >
                  <Text style={styles.statsLabel}>{group.members} members</Text>
                </TouchableOpacity>
                <Text style={styles.statsLabel}>{group.online} online</Text>
                <Button
                  title={group.joined ? "Joined" : "Join"}
                  containerStyle={styles.joinButtonContainerStyle}
                  buttonStyle={styles.joinButtonStyle}
                  titleStyle={styles.joinButtonTitleStyle}
                  onPress={group.joined ? handleGroupUnjoin : handleGroupJoin}
                  // disabled
                  activeOpacity={0.5}
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
                  onPress={handleSetView(RenderView.SYMPTOM_CHART)}
                  containerStyle={styles.tabButton}
                >
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          view === RenderView.SYMPTOM_CHART
                            ? theme.colors.primary
                            : theme.colors.grey1,
                      },
                    ]}
                  >
                    Symptom Chart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerBottom}>{renderView()}</View>
          </View>
        </Container>
      </Container>
    );
  }
  return null;
};

export default GroupDetailsScreen;

const useStyles = makeStyles(
  (theme, props: { isDark: boolean; isJoined: 0 | 1 }) => ({
    wrapper: {
      justifyContent: "flex-start",
      paddingHorizontal: 0,
      paddingVertical: 0,
      backgroundColor: props.isDark ? theme.colors.background : "transparent",
    },
    imageContainer: {
      opacity: props.isDark ? 0 : 1,
    },
    container: {
      minWidth: "100%",
    },
    containerTop: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
      paddingTop: StyleConstants.PADDING_VERTICAL,
      paddingBottom: StyleConstants.PADDING_VERTICAL / 2,
      borderBottomLeftRadius: StyleConstants.PADDING_HORIZONTAL,
      borderBottomRightRadius: StyleConstants.PADDING_HORIZONTAL,
    },
    title: {
      marginBottom: 12,
      color: props.isDark ? theme.colors.black : theme.colors.primary,
    },
    stats: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statsLabel: {
      color: props.isDark ? theme.colors.black : theme.colors.primary,
      fontWeight: "300",
    },
    description: {
      marginVertical: 24,
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
      padding: StyleConstants.PADDING_HORIZONTAL / 2,
    },
    inputContainer: {
      backgroundColor: theme.colors.background,
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
      borderRadius: StyleConstants.PADDING_HORIZONTAL / 2,
      marginHorizontal: 0,
    },
    joinButtonContainerStyle: {
      paddingHorizontal: 0,
      margin: 0,
    },
    joinButtonStyle: {
      backgroundColor: !!props.isJoined
        ? "transparent"
        : theme.colors.secondary,
      paddingHorizontal: 0,
      height: 28,
      minWidth: 82,
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
      fontSize: 16,
    },
  })
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
