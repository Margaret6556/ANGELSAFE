import { useAppSelector } from "@/shared/hooks";
import { makeStyles, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import Trend from "../Trend";

type Props = {};

const BioComponent = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const styles = useStyles();

  return (
    <View>
      <Text h4>Bio</Text>
      {user?.bio ? (
        <Text>{user.bio}</Text>
      ) : (
        <Text style={styles.bioPlaceholder}>Update profile to add bio</Text>
      )}
      <Trend
        style={{ marginTop: 24 }}
        winCount={user?.winCount || 0}
        painCount={user?.painCount || 0}
      />
    </View>
  );
};

export default BioComponent;

const useStyles = makeStyles((theme) => ({
  bioPlaceholder: {
    color: theme.colors.grey0,
    marginVertical: 12,
  },
}));
