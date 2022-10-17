import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Divider, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { ProfileParamsList, ProfileScreenProps } from "../types";
import { Avatar, Bio, Trend } from "../components";

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

const EntryScreen = ({
  navigation,
}: ProfileScreenProps<ProfileParamsList, "Entry">) => {
  return (
    <Container
      type="scroll"
      containerProps={{
        contentContainerStyle: styles.wrapper,
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={styles.containerTop}>
        <Text h2>Profile</Text>
        <Avatar
          containerStyle={{
            marginVertical: 24,
          }}
        />
        <Bio />
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.tab}>
          <Text>About Me</Text>
          <Text>Analytics</Text>
          <Text>Post</Text>
        </View>
        <Divider />
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
          <Text h4>Favorite Artists</Text>
          <View style={styles.hobbyContainer}>
            {artists.map((i) => (
              <View key={`${i}-${Math.random()}`} style={styles.hobby}>
                <Text style={{ textAlign: "center" }}>{i}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Button title="Edit Profile" containerStyle={styles.button} />
    </Container>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: StyleConstants.PADDING_VERTICAL,
    justifyContent: "flex-start",
  },
  containerTop: {
    backgroundColor: "#fff",
    width: "100%",
    borderBottomLeftRadius: StyleConstants.PADDING_HORIZONTAL,
    borderBottomRightRadius: StyleConstants.PADDING_HORIZONTAL,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  containerBottom: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    width: "100%",
  },
  tab: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
  content: {
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: 12,
  },
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
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
});
