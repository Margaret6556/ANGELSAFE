import { TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import { useViewProfileQuery } from "@/shared/api/profile";
import { Divider, Icon, Image, makeStyles, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppTabParamList } from "@/shared/types";
import { MoreParamsList } from "@/more/types";

type Props = {};

const ViewProfile = ({
  route,
}: StackScreenProps<GroupDetailsParamList, "ViewProfile">) => {
  const { id } = route.params;
  const { data, isError, error } = useViewProfileQuery({ ids: [id] });
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<AppTabParamList & MoreParamsList>>();

  const handleSendMessage = () => {
    navigation.navigate("More", {
      screen: "Chat",
      params: {
        screen: "ChatInterface",
        params: {
          id,
          username: data?.data[0].username,
          profilePic: data?.data[0].profilePic,
        },
      },
    } as any);
  };

  if (data) {
    const {
      data: [profile],
    } = data;
    return (
      <Container containerProps={{ style: styles.container }}>
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
            <TouchableOpacity onPress={handleSendMessage}>
              <Icon type="ionicon" name="paper-plane" />
            </TouchableOpacity>
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
    borderWidth: 1,
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
}));
