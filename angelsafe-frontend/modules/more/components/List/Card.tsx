import React from "react";
import { ListItem, Text, useTheme } from "@rneui/themed";
import { CardProps } from "@/more/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import { makeStyles } from "@rneui/base";
import { sizing } from "@/shared/providers/ThemeProvider";
import { moderateScale } from "react-native-size-matters";

const MoreCard = ({ label, onPress, icon }: CardProps) => {
  const handlePress = () => {
    onPress && onPress();
  };
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <ListItem containerStyle={styles.container}>
        <ListItem.Content style={styles.content}>
          <Text>{label}</Text>
          <Icon size={moderateScale(20)} color={theme.colors.grey0} {...icon} />
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default MoreCard;

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: sizing.BORDER_RADIUS,
    minHeight: sizing.BUTTON,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
