import React, { useEffect, useState } from "react";
import { Modal, View } from "react-native";
import { Avatar, Icon, makeStyles, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackendResponse, BackendErrorResponse } from "@/shared/types";
import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Loading } from "@/shared/components";
import { BlurView } from "expo-blur";
import { setUser } from "@/shared/state/reducers/auth";
import logger from "@/shared/utils/logger";
import { useUpdateGroupPhotoMutation } from "@/shared/api/groups";
import { moderateScale } from "react-native-size-matters";

interface GroupDisplayPhotoProps {
  profilePic: string;
  groupId: string;
}

const GroupDisplayPhoto = (props: GroupDisplayPhotoProps) => {
  const [image, setImage] = useState<ImageResult>();
  const [updatePhoto, updatePhotoResponse] = useUpdateGroupPhotoMutation();
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
        groupId: props.groupId,
      }).unwrap();
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("profile", err);
    }
  };

  return (
    <>
      <View style={[styles.container]}>
        <TouchableOpacity
          style={styles.avatarWithUpload}
          activeOpacity={0.4}
          onPress={handleSelectImage}
        >
          <Avatar
            size={moderateScale(64)}
            rounded
            source={{
              uri: image?.uri || props.profilePic,
            }}
            containerStyle={{ backgroundColor: "blue", zIndex: 1 }}
          />
          <Icon
            type="material"
            name="add-a-photo"
            size={moderateScale(16)}
            containerStyle={styles.iconContainer}
            style={{ backgroundColor: theme.colors.background }}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
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

export default GroupDisplayPhoto;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWithUpload: {
    height: moderateScale(64),
    borderRadius: 50,
  },
  text: {
    marginLeft: 16,
  },
  iconContainer: {
    zIndex: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 50,
    top: moderateScale(-18),
    height: moderateScale(25),
    width: moderateScale(25),
    left: moderateScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
}));
