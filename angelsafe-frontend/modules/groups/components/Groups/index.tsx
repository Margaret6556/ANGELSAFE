import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Text } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupParamsList, GroupsType } from "@/groups/types";
import { _API } from "@/shared/config";

interface GroupProps {
  data: GroupsType[];
}
const Groups = ({ data }: GroupProps) => {
  const navigation =
    useNavigation<NavigationProp<GroupParamsList, "GroupDetails">>();

  const handlePress = (id: string) => () => {
    navigation.navigate("GroupDetails", {
      screen: "Details",
      params: {
        id,
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        numColumns={3}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => null}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handlePress(item.id)}
            >
              <Avatar
                source={{ uri: item.profilePic }}
                rounded
                avatarStyle={styles.avatar}
                size={76}
              />
            </TouchableOpacity>
            <Text style={styles.textGroupName}>{item.groupname}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {},
  avatar: {},
  avatarContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    margin: 1,
    minHeight: 150,
    paddingTop: 36,
  },
  textGroupName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});
