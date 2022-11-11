import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import { useGetPostCommentsQuery } from "@/shared/api/post";
import { Container, ErrorText, Loading } from "@/shared/components";
import { Text, makeStyles } from "@rneui/themed";
import PostComments from "@/groups/components/PostComments";
import { StyleConstants } from "@/shared/styles";
import InputComment from "@/groups/components/PostComments/InputComment";
import { Card } from "@/groups/components";
import { useKeyboardShowing } from "@/shared/hooks";
import useDarkMode from "@/shared/hooks/useDarkMode";

const Comments = ({
  navigation,
  route,
}: StackScreenProps<GroupDetailsParamList, "PostComments">) => {
  const styles = useStyles();
  const { data, isError, error } = useGetPostCommentsQuery({
    postId: route.params.id,
  });
  const isDark = useDarkMode();

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

  if (data?.data) {
    const { data: comments } = data;

    return (
      <Container
        containerProps={{
          style: styles.container,
        }}
      >
        <FlatList
          style={styles.wrapper}
          data={[...comments].reverse()}
          keyExtractor={({ timestamp }) => String(timestamp)}
          ListHeaderComponent={<Card isComments {...route.params} />}
          renderItem={({ item }) => {
            return <PostComments key={item.timestamp} {...item} />;
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={{ paddingVertical: keyboardIsShowing ? 200 : 100 }} />
          }
        />
        <InputComment postId={route.params.id} />
      </Container>
    );
  }

  return <Loading />;
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
