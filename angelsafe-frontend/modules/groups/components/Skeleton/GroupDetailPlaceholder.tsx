import { View } from "react-native";
import React from "react";
import LinearGradientBackground from "@/shared/components/Layout/LinearGradientBackground";
import { Text, makeStyles } from "@rneui/themed";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import { StyleConstants } from "@/shared/styles";
import { GroupsType } from "@/groups/types";
import useIsDark from "@/shared/hooks/useIsDark";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

type GroupDetailPlaceholderProps = Pick<
  Partial<GroupsType>,
  "description" | "groupname"
>;

const GroupDetailPlaceholder = (props: GroupDetailPlaceholderProps) => {
  const isDark = useIsDark();
  const styles = useStyles({ isDark });

  return (
    <LinearGradientBackground>
      <Placeholder
        Animation={(props) => <Fade {...props} style={styles.fade} />}
      >
        <View style={styles.top}>
          {props.groupname ? (
            <Text h4 style={styles.title}>
              {props.groupname}
            </Text>
          ) : (
            <PlaceholderLine height={moderateScale(24)} width={40} />
          )}
          <PlaceholderLine height={moderateScale(12)} width={80} />
          {props.description ? (
            <Text>{props.description}</Text>
          ) : (
            <PlaceholderLine height={moderateScale(12)} width={100} />
          )}
        </View>
        <View style={styles.bottom}>{/* <Loading /> */}</View>
      </Placeholder>
    </LinearGradientBackground>
  );
};

export default GroupDetailPlaceholder;

const useStyles = makeStyles((theme, props: { isDark: boolean }) => ({
  top: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderBottomLeftRadius: sizing.BORDER_RADIUS,
    borderBottomRightRadius: sizing.BORDER_RADIUS,
    minHeight: "50%",
    justifyContent: "center",
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
  bottom: {
    flex: 1,
    minHeight: "100%",
  },
  title: {
    marginBottom: theme.spacing.sm,
    color: props.isDark ? theme.colors.black : theme.colors.primary,
  },
}));
