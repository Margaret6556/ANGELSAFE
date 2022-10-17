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
import useAxios from "@/shared/hooks/useAxios";
import axios from "axios";
import { _API } from "@/shared/config";
import { BackendResponse } from "@/shared/types";

type Props = {};

const GroupPhoto = ({
  navigation,
  route,
}: StackScreenProps<AddGroupParamList, "GroupPhoto">) => {
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState<ImageResult>();
  const api = useAxios();

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

  const handleSkip = () => {
    navigation.navigate("Entry" as any);
  };

  const handleUploadImage = async () => {
    setLoading(true);
    try {
      const {
        data: { status },
      } = await api.post<BackendResponse<{}>>(_API.GROUP.UPDATE_PIC, {
        profilePic: `data:image/png;base64,${image?.base64}`,
        // groupId: route.params.id, // TODO
      });

      if (status === 200) {
        navigation.navigate("Entry" as any);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log({ e: e.message, f: e.response?.data.message });
      }
    }
    setLoading(false);
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
            type="ionicon"
            name="person"
            size={100}
            containerStyle={styles.iconContainer}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={image ? "Select another" : "Select an Image"}
          onPress={handleSelectImage}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={{ fontSize: 14 }}
        />
        {image ? (
          <Button
            title="Confirm"
            onPress={handleUploadImage}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
            titleStyle={{ fontSize: 14 }}
            loading={isLoading}
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
        )}
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
    height: 100,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    // width: "50%"
  },
  buttonContainerStyle: {
    width: "40%",
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
