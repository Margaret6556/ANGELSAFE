import { StyleSheet, View } from "react-native";
import React from "react";
import { Divider, Icon, Text } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SearchIcon } from "@/shared/components";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text h3>Alerts</Text>
        {/* <View style={styles.icons}>
          <TouchableOpacity activeOpacity={0.5}>
            <SearchIcon />
          </TouchableOpacity>
        </View> */}
      </View>
      <Divider style={{ marginTop: 12 }} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
  },
});
