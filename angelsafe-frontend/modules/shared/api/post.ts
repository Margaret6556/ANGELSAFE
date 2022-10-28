import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse, UserType } from "../types";

export type PostsType = {
  id: string;
  ownerId: string;
  groupId: string;
  message: string;
  timestamp: number;
  comments: number;
  hearts: number;
  likes: number;
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
      providesTags: ["POST"],
    }),
    getSinglePost: builder.query<BackendResponse<PostsType[]>, void>({
      query: () => _API.POST.VIEW,
      providesTags: ["POST"],
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
      invalidatesTags: ["POST"],
    }),
    unHeartPost: builder.mutation<BackendResponse<{}>, { postId: string }>({
      query: (body) => ({
        url: _API.POST.UNHEART,
        method: "POST",
        body,
      }),
      invalidatesTags: ["POST"],
    }),
    likePost: builder.mutation<BackendResponse<{}>, { postId: string }>({
      query: (body) => ({
        url: _API.POST.HEART,
        method: "POST",
        body,
      }),
      invalidatesTags: ["POST"],
    }),
    unLikePost: builder.mutation<BackendResponse<{}>, { postId: string }>({
      query: (body) => ({
        url: _API.POST.UNHEART,
        method: "POST",
        body,
      }),
      invalidatesTags: ["POST"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPostListQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
} = postApiSlice;
