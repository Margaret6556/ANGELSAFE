import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Text } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupParamsList } from "@/groups/types";

type Props = {};

const groups = [
  {
    id: 1,
    name: "Cancer",
    logo: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  {
    id: 2,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
  {
    id: 3,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  {
    id: 4,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
  {
    id: 5,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  {
    id: 6,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
  {
    id: 7,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
  {
    id: 8,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  {
    id: 9,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
  {
    id: 10,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  {
    id: 11,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
  {
    id: 12,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  {
    id: 13,
    name: "Dads with Anxiety",
    logo: "https://xsgames.co/randomusers/avatar.php?g=female",
  },
];
const Groups = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<GroupParamsList>>();

  const handlePress = (id: number) => () => {
    navigation.navigate("GroupDetails", { id });
    console.log(id);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={groups}
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
                source={{ uri: item.logo }}
                rounded
                avatarStyle={styles.avatar}
                size={76}
              />
            </TouchableOpacity>
            <Text>{item.name}</Text>
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
    flex: 1,
    marginVertical: 24,
    marginHorizontal: 1,
  },
});
