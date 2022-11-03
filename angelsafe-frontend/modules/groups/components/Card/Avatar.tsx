import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "@/shared/hooks";
import timeSince from "@/shared/utils/timeSince";
import { useGetProfileQuery } from "@/shared/api/profile";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupDetailsParamList } from "@/groups/types";

interface AvatarCardProps {
  userId: string;
  postTimeStamp: number;
}

const AvatarCard = (props: AvatarCardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isError } = useGetProfileQuery(props.userId);
  const navigation =
    useNavigation<NavigationProp<GroupDetailsParamList, "ViewProfile">>();

  const handleOnViewProfile = () => () => {
    navigation.navigate("ViewProfile", {
      id: props.userId,
    });
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
  return null;
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