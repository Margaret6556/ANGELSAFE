import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text, useTheme } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { CardProps } from "@/more/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";
import { makeStyles } from "@rneui/base";

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
          <ListItem.Title style={styles.title}>{label}</ListItem.Title>
          <Icon size={20} color={theme.colors.grey0} {...icon} />
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default MoreCard;

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 12,
    minHeight: 50,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {},
}));
