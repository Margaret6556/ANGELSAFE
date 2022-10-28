import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Text } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupParamsList, GroupsType } from "@/groups/types";
import { _API } from "@/shared/config";

interface GroupProps {
  data: GroupsType[];
}
const Groups = ({ data }: GroupProps) => {
  const navigation = useNavigation<StackNavigationProp<GroupParamsList>>();

  const handlePress = (id: string) => () => {
    navigation.navigate("GroupDetails", { id });
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
    // marginTop: 48,
  },
  container: {},
  avatar: {
    // height: 100,
  },
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
  },
});
