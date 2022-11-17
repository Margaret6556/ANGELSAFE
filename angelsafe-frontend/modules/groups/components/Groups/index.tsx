import { Dimensions, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, makeStyles, Text } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupParamsList, GroupsType } from "@/groups/types";
import { _API } from "@/shared/config";
import { scale, moderateScale } from "react-native-size-matters";

interface GroupProps {
  data: GroupsType[];
}
const Groups = ({ data }: GroupProps) => {
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<GroupParamsList, "GroupDetails">>();

  const handlePress = (params: GroupsType) => () => {
    navigation.navigate("GroupDetails", {
      screen: "Details",
      params,
    });
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        numColumns={Dimensions.get("window").width > 500 ? 4 : 3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
        }}
        renderItem={({ item }) => (
          <View style={styles.avatarContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={handlePress(item)}>
              <Avatar
                source={{ uri: item.profilePic }}
                rounded
                size={scale(64)}
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

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    alignItems: "center",
    flex: 1,
    margin: 1,
    paddingTop: theme.spacing.xl,
  },
  textGroupName: {
    fontSize: moderateScale(14),
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
}));
