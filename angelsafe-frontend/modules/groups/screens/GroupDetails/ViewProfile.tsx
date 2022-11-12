import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import { useViewProfileQuery } from "@/shared/api/profile";
import { Divider, Icon, Image, makeStyles, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { CompositeScreenProps } from "@react-navigation/native";
import { useAppSelector } from "@/shared/hooks";
import { RootStackParamList } from "@/shared/types";

const ViewProfile = ({
  navigation,
  route,
}: CompositeScreenProps<
  StackScreenProps<GroupDetailsParamList, "ViewProfile">,
  StackScreenProps<RootStackParamList>
>) => {
  const { id } = route.params;
  const { data, isError, error } = useViewProfileQuery({ ids: [id] });
  const { user } = useAppSelector((state) => state.auth);
  const styles = useStyles();

  const handleSendMessage = () => {
    if (data?.data[0]) {
      navigation.navigate("App", {
        screen: "More",
        initial: true,
        params: {
          screen: "Chat",
          initial: false,
          params: {
            screen: "ChatInterface",
            initial: false,
            params: {
              id,
              username: data.data[0].username,
              profilePic: data.data[0].profilePic,
            },
          },
        },
      });
    }
  };

  if (data) {
    const {
      data: [profile],
    } = data;

    return (
      <Container
        type="scroll"
        containerProps={{ contentContainerStyle: styles.container }}
      >
        <View style={styles.top}>
          <Image
            source={{
              uri: profile.profilePic,
            }}
            containerStyle={styles.imageContainer}
          />
          <View style={styles.message}>
            <Text h4 style={{ marginRight: 12 }}>
              {profile.username}
            </Text>
            {profile.username !== user?.username && (
              <TouchableOpacity onPress={handleSendMessage}>
                <Icon type="ionicon" name="mail" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.bottom}>
          <Text style={styles.bio}>
            Country: <Text>{profile.country}</Text>
          </Text>
          <Text style={styles.bio}>
            Member since: <Text>{profile.member}</Text>
          </Text>
          <Text style={styles.bio}>
            Birth year: <Text>{profile.year}</Text>
          </Text>

          <View style={[styles.content, { marginVertical: 24 }]}>
            <Text style={styles.bio}>Hobbies</Text>
            <View style={styles.hobbyContainer}>
              {profile.hobbies.map((h) => (
                <Text key={h} style={styles.hobby}>
                  {h}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.bio}>Favorite Music Genres</Text>
            <View style={styles.hobbyContainer}>
              {profile.movies.map((h) => (
                <Text key={h} style={styles.hobby}>
                  {h}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.bio}>Favorite Music Genres</Text>
            <View style={styles.hobbyContainer}>
              {profile.music.map((h) => (
                <Text key={h} style={styles.hobby}>
                  {h}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Container>
    );
  }

  return null;
};

export default ViewProfile;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "flex-start",
    // backgroundColor: theme.colors.background,
  },
  top: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    borderWidth: StyleSheet.hairlineWidth,
    minWidth: "100%",
    borderColor: theme.colors.grey5,
    marginVertical: StyleConstants.PADDING_VERTICAL,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
  },
  bio: {
    color: theme.colors.primary,
    marginBottom: 8,
  },
  bottom: {
    width: "100%",
    alignItems: "flex-start",
  },
  imageContainer: {
    width: 160,
    height: 160,
    marginBottom: 12,
    borderRadius: 100,
  },
  content: { marginBottom: StyleConstants.PADDING_VERTICAL * 1.5 },
  hobbyContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  hobby: {
    padding: 10,
    backgroundColor: theme.colors.background,
    overflow: "hidden",
    margin: 10,
    marginLeft: 0,
    marginBottom: 0,
    minWidth: 100,
    borderRadius: 8,
    textAlign: "center",
  },
}));
