import { View } from "react-native";
import React from "react";
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed";

type Props = {};

const Header = (props: Props) => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text h2>Alerts</Text>
        {/* <View style={styles.icons}>
          <TouchableOpacity activeOpacity={0.5}>
            <SearchIcon />
          </TouchableOpacity>
        </View> */}
      </View>
      <Divider />
    </View>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  container: {
    padding: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
  },
}));
