import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useGetGroupMembersQuery } from "@/shared/api/groups";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import { Avatar, ListItem, makeStyles, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { StyleConstants } from "@/shared/styles";
import { ListItemChevron } from "@rneui/base/dist/ListItem/ListItem.Chevron";

const Members = ({
  navigation,
  route,
}: StackScreenProps<GroupDetailsParamList, "Members">) => {
  const { data, isError } = useGetGroupMembersQuery({
    groupId: route.params.groupId,
  });

  const handlePress = (id: string) => () => {
    navigation.push("ViewProfile", {
      id,
    });
  };

  const styles = useStyles();

  if (isError) {
    return null;
  }

  if (data) {
    return (
      <Container
        containerProps={{
          style: styles.container,
        }}
      >
        <FlatList
          ListHeaderComponent={
            <Text h4 style={{ padding: StyleConstants.PADDING_HORIZONTAL }}>
              Members
            </Text>
          }
          style={styles.listContainer}
          data={data.data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={handlePress(item.id)}>
                <ListItem bottomDivider>
                  <ListItemContent style={styles.listItemContent}>
                    <View style={styles.listItemAvatar}>
                      <Avatar
                        source={{
                          uri: item.profilePic,
                        }}
                        rounded
                        containerStyle={{ marginRight: 12 }}
                      />
                      <Text>{item.username}</Text>
                    </View>
                    <ListItemChevron />
                  </ListItemContent>
                </ListItem>
              </TouchableOpacity>
            );
            // return <Text>{item.id}</Text>;
          }}
        />
      </Container>
    );
  }

  return null;
};

export default Members;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingHorizontal: 0,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemAvatar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));
