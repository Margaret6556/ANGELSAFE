import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { makeStyles, useTheme } from "@rneui/themed";

interface LoadingComponentProps {
  solidBg?: boolean;
}

const LoadingComponent = ({ solidBg = false }: LoadingComponentProps) => {
  const { theme } = useTheme();
  const styles = useStyles({ solidBg: solidBg });
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

export default LoadingComponent;

const useStyles = makeStyles((theme, props: { solidBg: boolean }) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: props.solidBg ? theme.colors.background : "transparent",
  },
}));
