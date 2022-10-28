import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AvatarCardProps {
  userId: string;
  onViewProfile: () => void;
}

const AvatarCard = (props: AvatarCardProps) => {
  const handleOnViewProfile = () => {
    props.onViewProfile();
  };
  return (
    <View style={styles.container}>
      <Avatar
        source={{
          uri: "https://xsgames.co/randomusers/avatar.php?g=male",
        }}
        size={35}
        rounded
      />
      <View style={styles.text}>
        <View style={styles.textMember}>
          <Text style={styles.textMemberPrimary}>2659.aqua.pear (Aaron)</Text>
          <Text style={styles.textMemberSecondary}>8 hours ago</Text>
        </View>
        <TouchableOpacity onPress={handleOnViewProfile}>
          <Text style={{ color: "#898989", fontSize: 14 }}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvatarCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "cente",
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
