import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Text } from "@rneui/themed";
import { useAppSelector } from "@/shared/hooks";
import timeSince from "@/shared/utils/timeSince";
import { useGetProfileQuery } from "@/shared/api/profile";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupDetailsParamList } from "@/groups/types";
import PostAvatarPlacholder from "../Skeleton/PostAvatarPlacholder";

interface AvatarCardProps {
  userId: string;
  postTimeStamp: number;
}

const AvatarCard = (props: AvatarCardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isError } = useGetProfileQuery(props.userId);
  const navigation =
    useNavigation<NavigationProp<GroupDetailsParamList, "Details">>();

  const handleOnViewProfile = () => {
    if (data?.data.id) {
      navigation.navigate("ViewProfile", {
        id: data.data.id,
      });
    }
  };

  if (!user || isError) {
    return null;
  }

  if (data) {
    const { data: profile } = data;
    return (
      <View style={styles.container}>
        <Avatar
          source={{
            uri: profile.profilePic,
          }}
          size={35}
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
              <Text style={{ color: "#898989", fontSize: 14 }}>
                View Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return <PostAvatarPlacholder />;
};

export default AvatarCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textMember: { paddingHorizontal: 12 },
  textMemberPrimary: {
    fontSize: 14,
    fontWeight: "800",
  },
  textMemberSecondary: {
    fontSize: 14,
    color: "#898989",
  },
});
