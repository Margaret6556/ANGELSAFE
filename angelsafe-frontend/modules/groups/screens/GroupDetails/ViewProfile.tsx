import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import { useViewProfileQuery } from "@/shared/api/profile";
import { Divider, Icon, Image, makeStyles, Text } from "@rneui/themed";
import { Container, ErrorText } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { CompositeScreenProps } from "@react-navigation/native";
import { useAppSelector } from "@/shared/hooks";
import { RootStackParamList } from "@/shared/types";
import { Trend } from "@/profile/components";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import { moderateScale, scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

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
                <Icon type="ionicon" name="mail" size={moderateScale(24)} />
              </TouchableOpacity>
            )}
          </View>
          <Trend painCount={profile.painCount} winCount={profile.winCount} />
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

          <View style={styles.content}>
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
    marginVertical: theme.spacing.lg,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  bio: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  bottom: {
    width: "100%",
    alignItems: "flex-start",
  },
  imageContainer: {
    width: moderateScale(120),
    height: moderateScale(120),
    marginBottom: theme.spacing.lg,
    borderRadius: 100,
  },
  content: { marginVertical: theme.spacing.md },
  hobbyContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  hobby: {
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    marginLeft: 0,
    marginBottom: 0,
    minWidth: 100,
    borderRadius: sizing.BORDER_RADIUS,
    backgroundColor: theme.colors.background,
    overflow: "hidden",
    textAlign: "center",
  },
}));
