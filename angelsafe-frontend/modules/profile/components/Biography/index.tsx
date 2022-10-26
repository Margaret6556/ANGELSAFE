import { useAppSelector } from "@/shared/hooks";
import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import Trend from "../Trend";

type Props = {};

const BioComponent = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <View>
      <Text h4>Bio</Text>
      <Text>{user?.bio}</Text>
      <Trend style={{ marginTop: 24 }} />
    </View>
  );
};

export default BioComponent;

const styles = StyleSheet.create({});
