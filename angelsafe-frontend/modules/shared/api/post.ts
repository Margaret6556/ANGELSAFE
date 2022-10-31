import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse } from "../types";

export type PostsType = {
  id: string;
  ownerId: string;
  groupId: string;
  message: string;
  timestamp: number;
  comments: number;
  hearts: number;
  likes: number;
  liked: 0 | 1;
  hearted: 0 | 1;
};

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query<
      BackendResponse<PostsType[]>,
      { groupId: string }
    >({
      query: (body) => ({
        url: _API.POST.LIST,
        method: "POST",
        body,
      }),
      providesTags: (res) => {
        const tag = { type: "POST" as const, id: "LIST" };
        if (res?.data) {
          return [...res.data.map(({ id }) => ({ type: tag.type, id })), tag];
        }
        return [tag];
      },
    }),
    getMyPosts: builder.query<BackendResponse<PostsType[]>, void>({
      query: () => _API.POST.VIEW,
      providesTags: (res) => {
        const tag = { type: "POST" as const, id: "SINGLE" };
        if (res?.data) {
          return [...res.data.map(({ id }) => ({ type: tag.type, id })), tag];
        }
        return [tag];
      },
    }),
    createPost: builder.mutation<
      BackendResponse<null>,
      { message: string; groupId: string }
    >({
      query: (body) => ({
        url: _API.POST.CREATE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["POST"],
    }),
    heartPost: builder.mutation<BackendResponse<{}>, { postId: string }>({
      query: (body) => ({
        url: _API.POST.HEART,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        {
          type: "POST",
          id: arg.postId,
        },
      ],
    }),
    unHeartPost: builder.mutation<BackendResponse<{}>, { postId: string }>({
      query: (body) => ({
        url: _API.POST.UNHEART,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        {
          type: "POST",
          id: arg.postId,
        },
      ],
    }),
    likePost: builder.mutation<BackendResponse<{}>, { postId: string }>({
      query: (body) => ({
        url: _API.POST.LIKE,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        {
          type: "POST",
          id: arg.postId,
        },
      ],
    }),
    unLikePost: builder.mutation<BackendResponse<{}>, { postId: string }>({
      query: (body) => ({
        url: _API.POST.UNLIKE,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        {
          type: "POST",
          id: arg.postId,
        },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPostListQuery,
  useGetMyPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useHeartPostMutation,
  useUnLikePostMutation,
  useUnHeartPostMutation,
} = postApiSlice;
