import { StyleSheet, View } from "react-native";
import React from "react";
import { Divider, Icon, makeStyles, Text, useTheme } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modal } from "@/home/components";
import { _API } from "@/shared/config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupParamsList } from "@/groups/types";
import { SearchIcon } from "@/shared/components";

type Props = {};

const Header = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<GroupParamsList>>();
  const styles = useStyles();
  const { theme } = useTheme();

  const handleAddGroup = async () => {
    navigation.push("Add Group");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text h3>Groups</Text>
        <View style={styles.icons}>
          {/* <SearchIcon /> */}
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddGroup}>
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

export const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
}));
