import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import { useGetPostCommentsQuery } from "@/shared/api/post";
import { Container, ErrorText, Loading } from "@/shared/components";
import { makeStyles, Text } from "@rneui/themed";
import PostComments from "@/groups/components/PostComments";
import { StyleConstants } from "@/shared/styles";
import InputComment from "@/groups/components/PostComments/InputComment";
import { Card } from "@/groups/components";
import { useKeyboardShowing } from "@/shared/hooks";
import useDarkMode from "@/shared/hooks/useDarkMode";
import PostCommentsPlaceholder from "@/groups/components/Skeleton/PostCommentsPlaceholder";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";

const Comments = ({
  navigation,
  route,
}: StackScreenProps<GroupDetailsParamList, "PostComments">) => {
  const styles = useStyles();
  const { data, isError, error, isLoading } = useGetPostCommentsQuery({
    postId: route.params.id,
  });
  const isDark = useDarkMode();
  useSetSolidBackground();

  const { keyboardIsShowing } = useKeyboardShowing();

  useEffect(() => {
    if (isDark) {
      navigation.getParent()?.setOptions({
        header: () => null,
        headerStyle: {
          opacity: 0,
        },
      });
    } else {
      navigation.getParent()?.setOptions({});
    }
    return () => {};
  }, []);

  if (isError || error) {
    return <ErrorText />;
  }

  const d = data?.data || [];

  return (
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
    paddingTop: StyleConstants.PADDING_VERTICAL,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
}));
