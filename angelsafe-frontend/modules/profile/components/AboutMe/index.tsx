import React from "react";
import { View } from "react-native";
import { Button, makeStyles, Text } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileParamsList } from "@/profile/types";
import { useAppSelector } from "@/shared/hooks";

const AboutMeTab = () => {
  const navigation = useNavigation<NavigationProp<ProfileParamsList>>();
  const { user } = useAppSelector((state) => state.auth);

  const handleEditProfile = () => {
    navigation.navigate("Edit Profile");
  };

  const styles = useStyles();

  if (!user) {
    return null;
  }

  const emptyProfile =
    !!!user.hobbies?.length && !!!user.movies?.length && !!!user.music?.length;

  return (
    <>
      {!!user.hobbies?.length ? (
        <View style={styles.content}>
          <Text h4 style={styles.text}>
            Hobbies
          </Text>
          <View style={styles.hobbyContainer}>
            {user.hobbies.map((hobby) => (
              <View key={hobby} style={styles.hobby}>
                <Text style={{ textAlign: "center" }}>{hobby}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
      {!!user.movies?.length ? (
        <View style={styles.content}>
          <Text h4 style={styles.text}>
            Favorite Movie Genres
          </Text>
          <View style={styles.hobbyContainer}>
            {user.movies.map((movie) => (
              <View key={movie} style={styles.hobby}>
                <Text style={{ textAlign: "center" }}>{movie}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
      {!!user.music?.length ? (
        <View style={styles.content}>
          <Text h4 style={styles.text}>
            Favorite Music Genres
          </Text>
          <View style={styles.hobbyContainer}>
            {user.music.map((music) => (
              <View key={music} style={styles.hobby}>
                <Text style={{ textAlign: "center" }}>{music}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      <Button
        title={emptyProfile ? "Update Your Profile" : "Edit Profile"}
        containerStyle={[styles.button, { marginTop: emptyProfile ? 64 : 0 }]}
        onPress={handleEditProfile}
      />
    </>
  );
};

export default AboutMeTab;

const useStyles = makeStyles((theme) => ({
  content: { marginBottom: StyleConstants.PADDING_VERTICAL * 1.5 },
  hobbyContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    color: theme.colors.black,
  },
  hobby: {
    padding: 10,
    backgroundColor: theme.colors.background,
    margin: 10,
    marginLeft: 0,
    marginBottom: 0,
    minWidth: 100,

    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    width: "100%",
  },
}));
