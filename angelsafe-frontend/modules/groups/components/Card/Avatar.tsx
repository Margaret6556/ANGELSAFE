import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, makeStyles, Text, useTheme } from "@rneui/themed";
import { useAppSelector } from "@/shared/hooks";
import timeSince from "@/shared/utils/timeSince";
import { useViewProfileQuery } from "@/shared/api/profile";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupDetailsParamList } from "@/groups/types";
import PostAvatarPlacholder from "../Skeleton/PostAvatarPlacholder";
import { moderateScale, scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

interface AvatarCardProps {
  userId: string;
  postTimeStamp: number;
}

const AvatarCard = (props: AvatarCardProps) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const { data, isError } = useViewProfileQuery({ ids: [props.userId] });
  const navigation =
    useNavigation<NavigationProp<GroupDetailsParamList, "Details">>();
  const handleOnViewProfile = () => {
    if (data?.data[0].id) {
      navigation.navigate("ViewProfile", {
        id: data.data[0].id,
      });
    }
  };

  if (!user || isError) {
    return null;
  }

  if (data) {
    const {
      data: [profile],
    } = data;
    return (
      <View style={styles.container}>
        <Avatar
          source={{
            uri: profile.profilePic,
          }}
          size={moderateScale(36)}
          rounded
        />
        <View style={styles.text}>
          <View style={styles.textMember}>
            <Text style={styles.textMemberPrimary}>{profile.username}</Text>
            <Text style={styles.textMemberSecondary}>
              {timeSince(props.postTimeStamp)} ago
            </Text>
          </View>
          {props.userId !== user.id && (
            <TouchableOpacity onPress={handleOnViewProfile}>
              <Text style={styles.textMemberSecondary}>View Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return <PostAvatarPlacholder />;
};

export default AvatarCard;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textMember: { paddingHorizontal: theme.spacing.lg },
  textMemberPrimary: {
    fontSize: sizing.FONT.sm,
  },
  textMemberSecondary: {
    fontSize: sizing.FONT.xs,
    color: theme.colors.grey2,
  },
}));
