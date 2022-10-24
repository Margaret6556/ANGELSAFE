import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import { Button, lightColors, Text, useTheme } from "@rneui/themed";
import { Container, Loading } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { GroupParamsList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { Card } from "../components";
import Modal from "react-native-modal";
import { _API } from "@/shared/config";
import {
  useGetGroupMembersQuery,
  useGetSingleGroupQuery,
  useJoinGroupMutation,
  useUnjoinGroupMutation,
} from "@/shared/api/groups";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import {
  setBackgroundColor,
  setSolidBackground,
} from "@/shared/state/reducers/theme";
import { useIsFocused } from "@react-navigation/native";

const deviceHeight = Dimensions.get("screen").height;

const GroupDetailsScreen = ({
  navigation,
  route,
}: StackScreenProps<GroupParamsList, "GroupDetails">) => {
  const { id } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isError, error, isLoading } = useGetSingleGroupQuery(id);
  const [joinGroup, joinGroupResponse] = useJoinGroupMutation();
  const [unjoinGroup, unjoinGroupResponse] = useUnjoinGroupMutation();
  const { data: membersData } = useGetGroupMembersQuery({ groupId: id });
  const [bounces, setBounces] = useState(false);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const { theme } = useTheme();

  // if (!isFocused) {
  //   dispatch(setSolidBackground(false));
  // }

  // useEffect(() => {
  //   dispatch(setSolidBackground(true));
  // }, []);

  const styles = useMemo(() => makeStyles(theme.colors), []);

  const handleNewPost = () => {
    setModalVisible(!modalVisible);
  };

  const handleGroupJoin = (id: string) => async () => {
    const { data, status } = await joinGroup({ groupId: id }).unwrap();
    console.log({ status });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > deviceHeight - (deviceHeight - 200)) {
      setBounces(true);
    } else {
      setBounces(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    if ("status" in error) {
      console.log(error.data.message);
    }
  }

  if (data) {
    const { data: group } = data;

    return (
      <Container
        type="image"
        containerProps={{
          style: styles.wrapper,
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
                <Text style={styles.statsLabel}>{group.members} members</Text>
                <Text style={styles.statsLabel}>{group.online} online</Text>
                <Button
                  title={`Joined`}
                  size="sm"
                  containerStyle={styles.joinButtonContainerStyle}
                  buttonStyle={styles.joinButtonStyle}
                  titleStyle={styles.joinButtonTitleStyle}
                  onPress={handleGroupJoin("1")}
                />
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
        </Container>
      </Container>
    );
  }
  return null;
};

export default GroupDetailsScreen;

const makeStyles = (color: { primary: string }) =>
  StyleSheet.create({
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
      color: color.primary,
    },
    stats: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statsLabel: {
      color: color.primary,
      fontWeight: "300",
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
    joinButtonContainerStyle: {
      paddingHorizontal: 0,
      margin: 0,
    },
    joinButtonStyle: {
      backgroundColor: "transparent",
      paddingHorizontal: 0,
      height: 28,
      minWidth: 82,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: color.primary,
      padding: 0,
      margin: 0,
    },
    joinButtonTitleStyle: {
      color: color.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
