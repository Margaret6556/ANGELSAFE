import { StyleSheet, View } from "react-native";
import React from "react";
import { Divider, Icon, Text } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text h3>Groups</Text>
        <View style={styles.icons}>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon
              type="entypo"
              name="magnifying-glass"
              iconProps={{
                size: 22,
                name: "magnifying-glass",
              }}
              containerStyle={styles.iconContainer}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon
              type="antdesign"
              name="plus"
              iconProps={{
                size: 22,
                name: "plus",
              }}
              containerStyle={styles.iconContainer}
            />
          </TouchableOpacity>
        </View>
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
  iconContainer: {
    marginLeft: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
