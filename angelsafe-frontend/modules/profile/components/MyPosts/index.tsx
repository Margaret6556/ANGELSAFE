import { View } from "react-native";
import React from "react";
import { useGetMyPostsQuery } from "@/shared/api/post";
import { Card, Divider, makeStyles, Text } from "@rneui/themed";
import { Loading } from "@/shared/components";
import { useLazyGetSingleGroupQuery } from "@/shared/api/groups";
import { StyleConstants } from "@/shared/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppTabParamList } from "@/shared/types";
import PostCard from "./PostCard";

const MyPosts = () => {
  const navigate = useNavigation<NavigationProp<AppTabParamList, "Groups">>();
  const styles = useStyles();
  const { isError, data } = useGetMyPostsQuery();
  const [getGroup] = useLazyGetSingleGroupQuery();

  const handlePress = (id: string) => () => {
    navigate.navigate("Groups", {
      screen: "GroupDetails",
      params: {
        id,
      },
    } as any);
  };

  const fetchGroup = async (groupId: string) => {
    const a = await getGroup(groupId);
  };

  if (isError) {
    return null;
  }

  if (data) {
    return (
      <>
        {!!data.data.length ? (
          [...data.data]
            .reverse()
            .map((args) => <PostCard key={args.id} {...args} />)
        ) : (
          <Text style={styles.noPost}>
            No posts yet, join a group to create one!
          </Text>
        )}
      </>
    );
  }

  return <Loading />;
};

export default MyPosts;

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 0,
    borderRadius: StyleConstants.PADDING_HORIZONTAL / 2,
  },
  divider: {
    marginVertical: 12,
  },
  title: {
    fontFamily: "nunitoBold",
    color: theme.colors.primary,
    lineHeight: 24,
  },
  date: {
    fontSize: 12,
    color: theme.colors.grey1,
  },
  noPost: {
    color: theme.colors.grey0,
    textAlign: "center",
  },
}));
