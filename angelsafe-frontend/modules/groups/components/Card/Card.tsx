import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Icon, makeStyles, Text, useTheme } from "@rneui/themed";
import Avatar from "./Avatar";
import { StyleConstants } from "@/shared/styles";
import SocialIcon from "./SocialIcon";

interface CardFeedProps {
  description: string;
  ownerId: string;
  socials?: {
    likes: number;
    comments: number;
    hearts: number;
  };
}

const CardFeed = (props: CardFeedProps) => {
  const [liked, setLiked] = useState({
    liked: false,
    label: 20,
  });
  const [hearted, setHearted] = useState({
    hearted: false,
    label: 20,
  });

  const styles = useStyles();
  const { theme } = useTheme();

  const handleLike = () => {
    setLiked((prev) => ({
      ...prev,
      liked: !prev.liked,
      label: prev.label + 1,
    }));
  };
  const handleHeart = () => {
    setHearted((prev) => ({
      ...prev,
      hearted: !prev.hearted,
      label: prev.label + 1,
    }));
  };
  const handleComment = () => {};

  const handleViewProfile = () => {
    console.log("view profile");
  };

  return (
    <Card
      containerStyle={styles.cardContainer}
      wrapperStyle={styles.cardWrapper}
    >
      <Avatar userId={props.ownerId} onViewProfile={handleViewProfile} />
      <View style={styles.cardDescription}>
        <Text>{props.description}</Text>
      </View>
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
          enabled={liked.liked}
          enabledColor={theme.colors.secondary}
          label={liked.label}
          onPress={handleLike}
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
          enabled={hearted.hearted}
          enabledColor={theme.colors.error}
          label={hearted.label}
          onPress={handleHeart}
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
          label={23}
          onPress={handleComment}
        />
      </View>
    </Card>
  );
};

export default CardFeed;

const useStyles = makeStyles({
  cardContainer: {
    marginHorizontal: 0,
    borderRadius: StyleConstants.PADDING_HORIZONTAL / 2,
  },
  cardWrapper: {},
  cardAvatar: {},
  cardDescription: {
    marginVertical: 24,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
