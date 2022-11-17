import React from "react";
import { Animated, FlatList, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import { useGetPostCommentsQuery } from "@/shared/api/post";
import { Container, ErrorText } from "@/shared/components";
import { makeStyles } from "@rneui/themed";
import PostComments from "@/groups/components/PostComments";
import { StyleConstants } from "@/shared/styles";
import InputComment from "@/groups/components/PostComments/InputComment";
import { Card } from "@/groups/components";
import { useKeyboardShowing } from "@/shared/hooks";
import PostCommentsPlaceholder from "@/groups/components/Skeleton/PostCommentsPlaceholder";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import GroupDetailHeader from "@/groups/components/Header/GroupDetailHeader";
import { useGroupsContext } from "@/groups/components/GroupsContext";
import { moderateScale } from "react-native-size-matters";

const Comments = ({
  navigation,
  route,
}: StackScreenProps<GroupDetailsParamList, "PostComments">) => {
  const styles = useStyles();
  const { selectedGroupDetails } = useGroupsContext();
  const { data, isError, error, isLoading } = useGetPostCommentsQuery({
    postId: route.params.id,
  });
  useSetSolidBackground();

  const { keyboardIsShowing } = useKeyboardShowing();

  const handleNavigationBack = () => {
    navigation.goBack();
  };

  if (isError || error) {
    return <ErrorText />;
  }

  const d = data?.data || [];

  if (typeof selectedGroupDetails === "undefined") {
    return null;
  }

  return (
    <>
      <GroupDetailHeader
        animation={new Animated.Value(moderateScale(300))}
        groupname={selectedGroupDetails.groupname}
        onNavigationBack={handleNavigationBack}
        profilePic={selectedGroupDetails.profilePic}
      />
      <Container
        type="image"
        containerProps={{
          style: styles.container,
        }}
      >
        <FlatList
          style={styles.wrapper}
          data={[...d].reverse()}
          keyExtractor={({ timestamp }) => String(timestamp)}
          ListHeaderComponent={<Card isComments {...route.params} />}
          renderItem={({ item }) => (
            <PostComments key={item.timestamp} {...item} />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={{ paddingBottom: keyboardIsShowing ? 400 : 200 }}>
              {isLoading && (
                <>
                  <PostCommentsPlaceholder />
                  <PostCommentsPlaceholder />
                </>
              )}
            </View>
          }
        />
        <InputComment postId={route.params.id} />
      </Container>
    </>
  );
};

export default Comments;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "flex-start",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  wrapper: {
    width: "100%",
    padding: theme.spacing.lg,
  },
}));
