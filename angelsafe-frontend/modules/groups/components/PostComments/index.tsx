import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, makeStyles, Text, useTheme } from "@rneui/themed";
import { useViewProfileQuery } from "@/shared/api/profile";
import { ErrorText } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import timeSince from "@/shared/utils/timeSince";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupDetailsParamList } from "@/groups/types";

interface PostCommentProps {
  ownerId: string;
  message: string;
  timestamp: number;
}

const PostComments = (props: PostCommentProps) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<GroupDetailsParamList>>();

  const { data, isError, error } = useViewProfileQuery({
    ids: [props.ownerId],
  });

  const handleNavigateProfile = (id: string) => () => {
    navigation.navigate("ViewProfile", {
      id,
    });
  };

  if (isError || error) {
    return <ErrorText />;
  }

  if (data) {
    const {
      data: [profile],
    } = data;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleNavigateProfile(props.ownerId)}
          activeOpacity={0.5}
          style={{
            width: "10%",
          }}
        >
          <Avatar source={{ uri: profile.profilePic }} rounded />
        </TouchableOpacity>
        <View style={styles.content}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleNavigateProfile(props.ownerId)}
            >
              <Text style={styles.subtitle}>{profile.username}</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.grey0,
                  fontFamily: "nunitoRegular",
                  fontSize: 12,
                },
              ]}
            >
              {timeSince(props.timestamp)} ago
            </Text>
          </View>
          <Text>{props.message}</Text>
        </View>
      </View>
    );
  }

  return null;
};

export default PostComments;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    marginBottom: StyleConstants.PADDING_VERTICAL,
  },
  content: {
    width: "88%",
    marginLeft: "2%",
    padding: 8,
    backgroundColor: theme.mode === "light" ? "#fafafa" : theme.colors.grey5,
    borderRadius: StyleConstants.PADDING_VERTICAL / 2,
    borderWidth: 1,
    borderColor: theme.colors.grey5,
  },
  subtitle: {
    fontFamily: "nunitoBold",
    fontSize: 14,
    color: theme.colors.primary,
  },
}));
