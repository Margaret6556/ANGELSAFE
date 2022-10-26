import React, { useEffect, useState } from "react";
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Avatar, Icon, Text } from "@rneui/themed";
import { useAppSelector } from "@/shared/hooks";
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

  useEffect(() => {
    const upload = async () => {
      try {
        await handleUploadImage();
      } catch (e) {
        console.log({ e });
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
        console.log(e.message);
      }
    }
  };

  const handleUploadImage = async () => {
    try {
      const { data, status } = await updatePhoto({
        profilePic: `data:image/png;base64,${image?.base64}`,
      }).unwrap();

      console.log({ data });

      // if (status === 200) {
      //   navigation.navigate("Entry" as any);
      // }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      console.log(err, e);
    }
  };

  return (
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
          size={18}
          containerStyle={{
            top: -20,
            zIndex: 10,
            backgroundColor: "hsla(0, 100%, 10%, 0.3)",
            height: 30,
          }}
        />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text h4>{user?.username}</Text>
        <Text>{user?.member}</Text>
        <Text>{user?.gender && Identification[user.gender]}</Text>
      </View>
    </View>
  );
};

export default AvatarComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWithUpload: {
    overflow: "hidden",
    backgroundColor: "yellow",
    height: 64,
    borderRadius: 50,
  },
  text: {
    marginLeft: 16,
  },
});
