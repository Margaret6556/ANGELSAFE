import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AddGroupParamList, GroupParamsList } from "@/groups/types";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button, Icon, Image } from "@rneui/themed";
import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";
import { StyleConstants } from "@/shared/styles";
import { _API } from "@/shared/config";
import { useUpdateGroupPhotoMutation } from "@/shared/api/groups";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import logger from "@/shared/utils/logger";

const GroupPhoto = ({
  navigation,
  route,
}: StackScreenProps<AddGroupParamList, "GroupPhoto">) => {
  const { id } = route.params;
  const [image, setImage] = useState<ImageResult>();
  const [updatePhoto, updatePhotoResponse] = useUpdateGroupPhotoMutation();

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
        logger("groups", e.message);
      }
    }
  };

  const handleSkip = () => {
    navigation.navigate("Entry" as any);
  };

  const handleUploadImage = async () => {
    try {
      const { status } = await updatePhoto({
        profilePic: `data:image/png;base64,${image?.base64}`,
        groupId: id,
      }).unwrap();

      if (status === 200) {
        navigation.navigate("Entry" as any);
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("groups", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
            containerStyle={styles.iconContainer}
          />
        ) : (
          <Icon
            type="material-community"
            name="account-group"
            size={100}
            containerStyle={styles.iconContainer}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {image && (
          <Button
            title="Confirm"
            onPress={handleUploadImage}
            buttonStyle={styles.buttonStyle}
            // containerStyle={styles.buttonContainerStyle}
            titleStyle={{ fontSize: 14 }}
            loading={updatePhotoResponse.isLoading}
          />
        )}
        <Button
          title={image ? "Select another" : "Select an Image"}
          onPress={handleSelectImage}
          buttonStyle={styles.buttonStyle}
          type={image ? "outline" : "solid"}
          // containerStyle={styles.buttonContainerStyle}
          titleStyle={{ fontSize: 14 }}
        />
        {/* {image ? (
          <Button
            title="Confirm"
            onPress={handleUploadImage}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
            titleStyle={{ fontSize: 14 }}
            loading={updatePhotoResponse.isLoading}
          />
        ) : (
          <Button
            title="Skip"
            onPress={handleSkip}
            buttonStyle={[styles.buttonStyle]}
            containerStyle={styles.buttonContainerStyle}
            titleStyle={{ fontSize: 14 }}
            type="outline"
          />
        )} */}
      </View>
    </View>
  );
};

export default GroupPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: StyleConstants.PADDING_HORIZONTAL,
  },
  imageContainer: {
    minHeight: 350,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    // height: 100,
    width: "100%",
    justifyContent: "space-between",
    // flexDirection: "row",
    // alignItems: "center",
  },
  buttonStyle: {
    marginBottom: 24,
    // width: "50%"
  },
  buttonContainerStyle: {
    width: "100%",
    margin: 12,
  },
  iconContainer: {
    backgroundColor: "#dedede",
    borderRadius: 100,
    height: 200,
    width: 200,
    justifyContent: "center",
  },
});
