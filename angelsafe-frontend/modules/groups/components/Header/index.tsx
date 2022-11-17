import { StyleSheet, View } from "react-native";
import React from "react";
import { Divider, Icon, makeStyles, Text, useTheme } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { _API } from "@/shared/config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupParamsList } from "@/groups/types";
import { SearchIcon } from "@/shared/components";
import { useGroupsContext } from "../GroupsContext";
import { moderateScale, scale } from "react-native-size-matters";

const Header = () => {
  const navigation = useNavigation<StackNavigationProp<GroupParamsList>>();
  const styles = useStyles();
  const { theme } = useTheme();
  const { handleToggleSearchModal } = useGroupsContext();

  const handleAddGroup = async () => {
    navigation.push("Add Group");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text h2>Groups</Text>
        <View style={styles.icons}>
          <SearchIcon onPress={handleToggleSearchModal} />
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddGroup}>
            <Icon
              type="antdesign"
              name="plus"
              size={moderateScale(24)}
              containerStyle={styles.iconContainer}
            />
          </TouchableOpacity>
        </View>
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
  iconContainer: {
    marginLeft: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
    height: moderateScale(42),
    width: moderateScale(42),
    justifyContent: "center",
    alignItems: "center",
  },
}));
