import { Text, View } from "react-native";
import React from "react";
import LinearGradientBackground from "@/shared/components/Layout/LinearGradientBackground";
import { Card, makeStyles } from "@rneui/themed";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import { StyleConstants } from "@/shared/styles";
import { Loading } from "@/shared/components";

type Props = {};

const GroupDetailPlaceholder = (props: Props) => {
  const styles = useStyles();
  return (
    <LinearGradientBackground>
      <Placeholder
        Animation={(props) => <Fade {...props} style={styles.fade} />}
      >
        <View style={styles.top}>
          <PlaceholderLine height={24} width={40} />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={100} />
        </View>
        <View style={styles.bottom}>{/* <Loading /> */}</View>
      </Placeholder>
    </LinearGradientBackground>
  );
};

export default GroupDetailPlaceholder;

const useStyles = makeStyles((theme) => ({
  top: {
    backgroundColor: theme.colors.background,
    paddingTop: StyleConstants.PADDING_VERTICAL,
    paddingBottom: StyleConstants.PADDING_VERTICAL / 2,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    borderBottomLeftRadius: StyleConstants.PADDING_HORIZONTAL,
    borderBottomRightRadius: StyleConstants.PADDING_HORIZONTAL,
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
}));
