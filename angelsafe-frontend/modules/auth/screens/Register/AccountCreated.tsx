import React, { useEffect } from "react";
import { AuthRegisterParamList } from "@/auth/types";
import { View, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
// import { login } from "@/shared/state/reducers/auth";
import { Text, Button, Image, useTheme, makeStyles } from "@rneui/themed";
import { buttomBottomPosition } from "@/shared/styles";
import { Container } from "@/shared/components";
import { setLoggedIn, setRedirectToGroup } from "@/shared/state/reducers/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

const AccountCreated = ({
  navigation,
  route,
}: StackScreenProps<AuthRegisterParamList, "Account Created">) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(({ auth }) => auth);
  const styles = useStyles();
  const { theme } = useTheme();

  const handleGoToHomepage = () => {
    dispatch(setLoggedIn(true));
  };
  const handleFindGroups = () => {
    dispatch(setRedirectToGroup());
  };

  return (
    <Container
      containerProps={{
        style: styles.wrapper,
      }}
    >
      <Text>Account Created!</Text>
      <Image
        source={require("../../../../assets/auth/Saly-15.png")}
        style={styles.image}
        resizeMode="contain"
        containerStyle={{
          height: moderateScale(300),
          marginTop: moderateScale(48),
          width: "100%",
          alignItems: "center",
        }}
      />

      <View style={styles.button}>
        <Button
          title="Find Groups"
          onPress={handleFindGroups}
          containerStyle={{ marginBottom: theme.spacing.md }}
        />
        <Button
          title="Go to Home Page"
          onPress={handleGoToHomepage}
          loading={isLoading}
        />
      </View>
    </Container>
  );
};

export default AccountCreated;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    justifyContent: "flex-start",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    position: "absolute",
    bottom: buttomBottomPosition,
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    justifyContent: "space-between",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: sizing.FONT.sm,
    color: "#333",
  },
}));