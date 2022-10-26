import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import React from "react";
import { StyleConstants } from "@/shared/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileParamsList } from "@/profile/types";

type Props = {};
const hobbies = [
  "Cooking",
  "Yoga",
  "Hiking",
  "Biking",
  "Dancing",
  "Reading",
  "Singing",
  "Fishing",
];
const artists = ["Dojo Cat", "Mac Miller", "Muse", "The Strokes"];
const AboutMeTab = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ProfileParamsList>>();

  const handleEditProfile = () => {
    navigation.navigate("Edit Profile");
  };

  return (
    <>
      <View style={styles.content}>
        <Text h4>Hobbies</Text>
        <View style={styles.hobbyContainer}>
          {hobbies.map((i) => (
            <View key={`${i}-${Math.random()}`} style={styles.hobby}>
              <Text style={{ textAlign: "center" }}>{i}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.content}>
        <Text h4>Favorite Music Genre</Text>
        <View style={styles.hobbyContainer}>
          {artists.map((i) => (
            <View key={`${i}-${Math.random()}`} style={styles.hobby}>
              <Text style={{ textAlign: "center" }}>{i}</Text>
            </View>
          ))}
        </View>
      </View>

      <Button
        title="Edit Profile"
        containerStyle={styles.button}
        onPress={handleEditProfile}
      />
    </>
  );
};

export default AboutMeTab;

const styles = StyleSheet.create({
  content: { marginBottom: StyleConstants.PADDING_VERTICAL },
  hobbyContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  hobby: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    marginLeft: 0,
    marginBottom: 0,
    minWidth: 100,
  },
  button: {
    width: "100%",
    // paddingBottom: StyleConstants.PADDING_HORIZONTAL,
  },
});
