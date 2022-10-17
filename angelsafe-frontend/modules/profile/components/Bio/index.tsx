import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

import Trend from "../Trend";

type Props = {};

const BioComponent = (props: Props) => {
  return (
    <View>
      <Text h4>Bio</Text>
      <Text>
        Software engineer. I have Prostate cancer, I’m currently in
        chemotherapy. I have a son and a beautiful wife.
      </Text>
      <Trend style={{ marginTop: 24 }} />
    </View>
  );
};

export default BioComponent;

const styles = StyleSheet.create({});
