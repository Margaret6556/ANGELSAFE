import React from "react";
import { View } from "react-native";
import { Card, makeStyles, Text, useTheme } from "@rneui/themed";
import Avatar from "./Avatar";
import { StyleConstants } from "@/shared/styles";
import SocialIcon from "./SocialIcon";
import {
  useHeartPostMutation,
  useLikePostMutation,
  useUnHeartPostMutation,
  useUnLikePostMutation,
} from "@/shared/api/post";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import logger from "@/shared/utils/logger";
import { PostsType } from "@/shared/api/post";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupDetailsParamList } from "@/groups/types";
import { sizing } from "@/shared/providers/ThemeProvider";

interface CardFeedProps extends PostsType {
  isComments?: boolean;
  isGroupMember?: boolean;
}

const CardFeed = (props: CardFeedProps) => {
  const navigation = useNavigation<NavigationProp<GroupDetailsParamList>>();

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnLikePostMutation();
  const [heartPost] = useHeartPostMutation();
  const [unheartPost] = useUnHeartPostMutation();

  const styles = useStyles();
  const { theme } = useTheme();

  const handleToggleLike = (liking: boolean) => async () => {
    try {
      let data, status;
      if (liking) {
        const response = await likePost({
          postId: props.id,
        }).unwrap();
        data = response.data;
        status = response.status;
      } else {
        const response = await unlikePost({
          postId: props.id,
        }).unwrap();
        data = response.data;
        status = response.status;
      }
      if (status === 200) {
        logger("post", { data, status });
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("post", err);
    }
  };

  const handleToggleHeart = (hearting: boolean) => async () => {
    try {
      let data, status;
      if (hearting) {
        const response = await heartPost({
          postId: props.id,
        }).unwrap();
        data = response.data;
        status = response.status;
      } else {
        const response = await unheartPost({
          postId: props.id,
        }).unwrap();
        data = response.data;
        status = response.status;
      }
      if (status === 200) {
        logger("post", { data, status });
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("post", err);
    }
  };

  const handleComment = () => {
    navigation.navigate("PostComments", {
      ...props,
    });
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <Avatar userId={props.ownerId} postTimeStamp={props.timestamp} />
      <View style={styles.cardDescription}>
        <Text>{props.message}</Text>
      </View>
      {!props.isComments && (
        <View style={styles.socialIcons}>
          <SocialIcon
            iconProps={{
              name: "like2",
              type: "antdesign",
            }}
            isEnabledIcon={{
              name: "like1",
              type: "antdesign",
            }}
            enabled={!!props.liked}
            enabledColor={theme.colors.secondary}
            label={props.likes}
            onPress={handleToggleLike(!!!props.liked)}
          />
          <SocialIcon
            iconProps={{
              name: "hearto",
              type: "antdesign",
            }}
            isEnabledIcon={{
              name: "heart",
              type: "antdesign",
            }}
            enabled={!!props.hearted}
            enabledColor={theme.colors.error}
            label={props.hearts}
            onPress={handleToggleHeart(!!!props.hearted)}
          />
          <SocialIcon
            iconProps={{
              name: "chatbubble-outline",
              type: "ionicon",
            }}
            isEnabledIcon={{
              name: "",
              type: "",
            }}
            label={props.comments}
            onPress={handleComment}
          />
        </View>
      )}
    </Card>
  );
};

export default CardFeed;

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginHorizontal: 0,
    marginBottom: theme.spacing.lg,
    margin: 0,
    borderRadius: sizing.BORDER_RADIUS,
  },
  cardDescription: {
    marginVertical: theme.spacing.lg,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
