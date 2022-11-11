import { Alert, Keyboard, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ProfileParamsList } from "../types";
import { Container } from "@/shared/components";
import { Button, Input, makeStyles, Text, useTheme } from "@rneui/themed";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
  useKeyboardShowing,
} from "@/shared/hooks";
import { useUpdateProfileMutation } from "@/shared/api/profile";
import {
  BackendErrorResponse,
  BackendResponse,
  UserType,
} from "@/shared/types";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import { setUser } from "@/shared/state/reducers/auth";
import CustomMultiSelect from "@/shared/components/MultiSelect";
import {
  hobbies,
  movieGenres,
  musicGenres,
} from "@/shared/config/profileStaticData";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StyleConstants } from "@/shared/styles";
import useDarkMode from "@/shared/hooks/useDarkMode";
import logger from "@/shared/utils/logger";

const mappedHobbies = hobbies.map((hobby) => ({
  id: hobby,
  name: hobby,
}));

const mappedMovieGenres = movieGenres.map((movie) => ({
  id: movie,
  name: movie,
}));

const mappedMusicGenres = musicGenres.map((music) => ({
  id: music,
  name: music,
}));

const bioMaxLength = 200;

type FieldsType = {
  bio: string;
  hobbies: typeof mappedHobbies;
  movies: typeof mappedMovieGenres;
  music: typeof mappedMusicGenres;
};

const EditProfile = ({
  navigation,
}: StackScreenProps<ProfileParamsList, "Edit Profile">) => {
  useSetSolidBackground();
  const { user } = useAppSelector((state) => state.auth);
  const [updateProfile, updateProfileResponse] = useUpdateProfileMutation();
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const [buttonMargin, setButtonMargin] = useState(20);
  const { keyboardIsShowing } = useKeyboardShowing();
  const isDark = useDarkMode();

  const dispatch = useAppDispatch();
  const styles = useStyles({
    buttonMargin,
  });
  const { theme } = useTheme();

  useEffect(() => {
    if (keyboardIsShowing) {
      setButtonMargin(100);
    } else {
      setButtonMargin(20);
    }
  }, [keyboardIsShowing]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm({
    defaultValues: {
      bio: "",
      hobbies: [] as { id: ""; name: "" }[],
      movies: [] as { id: ""; name: "" }[],
      music: [] as { id: ""; name: "" }[],
    },
  });

  const { replace: replaceHobbies } = useFieldArray({
    name: "hobbies",
    control,
  });
  const { replace: replaceMovies } = useFieldArray({
    name: "movies",
    control,
  });
  const { replace: replaceMusic } = useFieldArray({
    name: "music",
    control,
  });

  const hobbies = watch("hobbies");
  const movies = watch("movies");
  const music = watch("music");

  const biography = watch("bio");
  const handleEditProfile = async (val: FieldsType) => {
    try {
      let body = val as unknown as Partial<
        Pick<UserType, "bio" | "hobbies" | "movies" | "music">
      >;

      if (!!!body.bio) {
        delete body.bio;
      }
      if (!!!body?.hobbies?.length) {
        delete body.hobbies;
      }
      if (!!!body?.movies?.length) {
        delete body.movies;
      }
      if (!!!body?.music?.length) {
        delete body.music;
      }

      const { status } = await updateProfile(body).unwrap();
      if (status === 200) {
        showAlert();
        dispatch(setUser(body));
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      setError("bio", {
        type: "value",
        message: err.data.message,
      });
      logger("profile", err);
    }
  };

  const showAlert = () => {
    Alert.alert("Success", undefined, [
      {
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Container
        type="image"
        containerProps={{
          style: {
            ...styles.container,
            backgroundColor: isDark ? theme.colors.background : "transparent",
          },
          imageStyle: {
            opacity: isDark ? 0 : 1,
          },
        }}
      >
        <FlatList
          data={[{ id: "" }]}
          style={{ minWidth: "100%" }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Controller
              name="bio"
              control={control}
              rules={{
                minLength: {
                  value: 2,
                  message: "Minimum of 2 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  label={
                    <View style={styles.inputLabelContainer}>
                      <Text
                        style={{
                          color: isDark
                            ? theme.colors.grey1
                            : theme.colors.primary,
                          fontSize: 16,
                        }}
                      >
                        Enter Biography
                      </Text>
                      <Text style={styles.bioLength}>
                        {biography.length}/{bioMaxLength}
                      </Text>
                    </View>
                  }
                  multiline
                  inputStyle={{
                    height: Math.max(100, multilineHeight),
                  }}
                  errorStyle={{ textAlign: "right" }}
                  errorMessage={errors.bio?.message}
                  {...field}
                  onContentSizeChange={(event) => {
                    setMultiLineHeight(event.nativeEvent.contentSize.height);
                  }}
                  onChangeText={field.onChange}
                  labelStyle={{ fontSize: 16 }}
                  maxLength={bioMaxLength}
                  placeholder={user?.bio}
                  style={{ backgroundColor: theme.colors.white }}
                  placeholderTextColor={theme.colors.grey0}
                />
              )}
            />
          }
          renderItem={() => (
            <View>
              <Controller
                control={control}
                name="hobbies"
                render={() => (
                  <CustomMultiSelect
                    items={mappedHobbies}
                    selectedItems={hobbies}
                    onSelectedItemsChange={(item) => {
                      replaceHobbies(item);
                    }}
                    selectText="Select Multiple Hobbies"
                    uniqueKey="id"
                    searchInputPlaceholderText="Search Hobbies..."
                    label="Add Hobbies"
                  />
                )}
              />
              <Controller
                control={control}
                name="movies"
                render={() => (
                  <CustomMultiSelect
                    items={mappedMovieGenres}
                    selectedItems={movies}
                    onSelectedItemsChange={(item) => {
                      replaceMovies(item);
                    }}
                    selectText="Select Multiple Movie Genres"
                    uniqueKey="id"
                    searchInputPlaceholderText="Search Movie Genres..."
                    label="Add Favorite Movie Genres"
                  />
                )}
              />
              <Controller
                control={control}
                name="music"
                render={() => (
                  <CustomMultiSelect
                    items={mappedMusicGenres}
                    selectedItems={music}
                    onSelectedItemsChange={(item) => {
                      replaceMusic(item);
                    }}
                    selectText="Select Multiple Music Genres"
                    uniqueKey="id"
                    searchInputPlaceholderText="Search Music Genres..."
                    label="Add Favorite Music Genres"
                  />
                )}
              />
            </View>
          )}
          ListFooterComponent={
            <Button
              containerStyle={styles.button}
              title="Submit"
              onPress={handleSubmit(handleEditProfile)}
              loading={updateProfileResponse.isLoading}
            />
          }
        />
      </Container>
    </Pressable>
  );
};

export default EditProfile;

const useStyles = makeStyles((theme, props: { buttonMargin: number }) => ({
  container: {
    justifyContent: "space-between",
    flex: 1,
    paddingVertical: 0,
  },
  bioLength: {
    textAlign: "right",
    fontSize: 12,
    color: theme.colors.black,
  },
  inputLabelContainer: {
    marginTop: StyleConstants.PADDING_VERTICAL,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginVertical: props.buttonMargin,
  },
  inputFieldsWrapper: {
    width: "100%",
  },
}));
