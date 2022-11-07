import { TouchableOpacity, View } from "react-native";
import React from "react";
import theme from "@/shared/providers/theme";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import {
  setBackgroundImage,
  BackgroundImageThemes,
  BackgroundImage,
} from "@/shared/state/reducers/theme";
import { Text, makeStyles, Image, useTheme } from "@rneui/themed";

const BackgroundImageTheme = () => {
  const { backgroundImage } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { theme } = useTheme();

  const handleThemeVariant = (id: BackgroundImage) => () => {
    dispatch(setBackgroundImage(id));
  };

  return (
    <View style={{ marginBottom: 36 }}>
      <Text style={styles.title}>Theme</Text>
      <View style={styles.themes}>
        {ImageBackgrounds.map((i) => (
          <TouchableOpacity
            key={i.title}
            onPress={handleThemeVariant(i.title)}
            activeOpacity={0.5}
          >
            <Image
              source={i.image}
              style={[
                styles.image,
                {
                  borderColor:
                    backgroundImage === i.title
                      ? theme.colors.primary
                      : theme.colors.grey3,
                },
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BackgroundImageTheme;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    marginBottom: 12,
    color: theme.colors.primary,
    fontFamily: "nunitoBold",
  },
  themes: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
}));

const ImageBackgrounds = [
  { image: BackgroundImageThemes.DEFAULT, title: BackgroundImage.DEFAULT },
  { image: BackgroundImageThemes.VARIANT1, title: BackgroundImage.VARIANT1 },
  { image: BackgroundImageThemes.VARIANT2, title: BackgroundImage.VARIANT2 },
  { image: BackgroundImageThemes.VARIANT3, title: BackgroundImage.VARIANT3 },
  { image: BackgroundImageThemes.VARIANT4, title: BackgroundImage.VARIANT4 },
  { image: BackgroundImageThemes.VARIANT5, title: BackgroundImage.VARIANT5 },
];
