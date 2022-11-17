import React, { useCallback, useEffect, useRef } from "react";
import { AuthParamList } from "@/auth/types";
import { View, Animated } from "react-native";
import { Button, makeStyles } from "@rneui/themed";
import { Container, Logo } from "@/shared/components";
import { StackScreenProps } from "@react-navigation/stack";
import { moderateScale } from "react-native-size-matters";

const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, "Entry">) => {
  const animation = useRef(new Animated.Value(0)).current;
  const styles = useStyles();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 600,
    }).start();
  }, []);

  const createAnimation = useCallback(
    (val: number) => ({
      opacity: animation,
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [moderateScale(val), 0],
          }),
        },
      ],
    }),
    []
  );

  return (
    <Container>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: animation,
          },
        ]}
      >
        <Logo />
      </Animated.View>
      <View style={styles.buttonGroup}>
        <Animated.View
          style={[
            styles.marginBottom,
            {
              ...createAnimation(100),
            },
          ]}
        >
          <Button
            title="Login"
            onPress={() => {
              navigation.push("Login");
            }}
          />
        </Animated.View>
        <Animated.View style={createAnimation(200)}>
          <Button
            title="Sign Up"
            type="outline"
            onPress={() => {
              navigation.setOptions({});
              navigation.push("Register");
            }}
          />
        </Animated.View>
      </View>
    </Container>
  );
};

export default LoginScreen;

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    width: "100%",
    justifyContent: "space-between",
  },
  marginBottom: {
    marginBottom: theme.spacing.lg,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
}));
