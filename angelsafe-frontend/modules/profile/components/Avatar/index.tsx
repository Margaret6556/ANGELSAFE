import React, { useEffect, useState } from "react";
import {
  ImageSourcePropType,
  Modal,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Avatar, Icon, makeStyles, Text, useTheme } from "@rneui/themed";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackendResponse, BackendErrorResponse } from "@/shared/types";
import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useUpdateProfilePictureMutation } from "@/shared/api/profile";
import { Loading } from "@/shared/components";
import { BlurView } from "expo-blur";
import { setUser } from "@/shared/state/reducers/auth";
import logger from "@/shared/utils/logger";

interface IAvatarProps {
  source?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
}

enum Identification {
  Male = "He/Him",
  Female = "She/Her",
}

const AvatarComponent = (props: IAvatarProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [image, setImage] = useState<ImageResult>();
  const [updatePhoto, updatePhotoResponse] = useUpdateProfilePictureMutation();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const styles = useStyles();

  useEffect(() => {
    const upload = async () => {
      try {
        await handleUploadImage();
      } catch (e) {
        logger("profile", { e });
      }
    };

    if (image && image.base64) {
      upload();
    }
  }, [image]);

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0,
      });

      if (!result.cancelled) {
        const img = await manipulateAsync(
          result.uri,
          [
            {
              resize: {
                width: 120,
              },
            },
          ],
          {
            base64: true,
            compress: 0,
            format: SaveFormat.PNG,
          }
        );
        setImage(img);
      }
    } catch (e) {
      if (e instanceof Error) {
        logger("profile", e.message);
      }
    }
  };

  const handleUploadImage = async () => {
    try {
      const profilePic = `data:image/png;base64,${image?.base64}`;
      const { data, status } = await updatePhoto({
        profilePic,
      }).unwrap();

      dispatch(
        setUser({
          profilePic,
        })
      );
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("profile", err);
    }
  };

  return (
    <>
      <View style={[styles.container, props.containerStyle]}>
        <TouchableOpacity
          style={styles.avatarWithUpload}
          activeOpacity={0.4}
          onPress={handleSelectImage}
        >
          <Avatar
            size={64}
            rounded
            source={{
              uri: user?.profilePic,
            }}
            containerStyle={{ backgroundColor: "blue", zIndex: 1 }}
          />
          <Icon
            type="material"
            name="add-a-photo"
            size={16}
            containerStyle={styles.iconContainer}
            style={{ backgroundColor: theme.colors.background }}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
        <View style={styles.text}>
          <Text h4>{user?.username}</Text>
          <Text>{user?.member}</Text>
          <Text>{user?.gender && Identification[user.gender]}</Text>
        </View>
      </View>
      <Modal
        visible={updatePhotoResponse.isLoading}
        presentationStyle="overFullScreen"
        transparent
      >
        <BlurView
          intensity={12}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </BlurView>
      </Modal>
    </>
  );
};

export default AvatarComponent;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWithUpload: {
    height: 64,
    borderRadius: 50,
  },
  text: {
    marginLeft: 16,
  },
  iconContainer: {
    top: -18,
    zIndex: 10,
    backgroundColor: theme.colors.background,
    height: 25,
    width: 25,
    left: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
}));
