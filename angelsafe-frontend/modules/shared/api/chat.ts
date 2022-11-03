import { apiSlice } from ".";
import { _API } from "../config";
import store from "../state";
import { BackendResponse, UserType } from "../types";
import { io } from "socket.io-client";
import logger from "../utils/logger";

export type ProfileRegisterType = {
  username: string;
  year: string;
  country: string;
  gender: string;
};

export interface ChatListResponse {
  id: string;
  receiver: UserType;
  read: number;
  lastMessage: string;
}

type CreateChatType = {
  receiverId: string;
  message: string;
};

type SingleChatResponse = {
  id: string;
  timestamp: string;
  message: string;
  sender: UserType;
  receiver: UserType;
};

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query<BackendResponse<ChatListResponse[]>, void>({
      query: () => ({
        url: _API.CHAT.LIST,
        method: "POST",
      }),
      providesTags: (res) => {
        const tag = { type: "CHAT" as const, id: "LIST" };
        if (res?.data) {
          return [
            ...res.data.map(({ id }) => ({
              type: "CHAT" as const,
              id,
            })),
            tag,
          ];
        }
        return [tag];
      },
    }),
    viewChat: builder.query<
      BackendResponse<SingleChatResponse[]>,
      { receiverId: string; skip?: string }
    >({
      query: (body) => ({
        url: _API.CHAT.VIEW,
        method: "POST",
        body,
      }),
      providesTags: [{ type: "CHAT" as const, id: "LIST" }],
    }),
    createChat: builder.mutation<BackendResponse<{}>, CreateChatType>({
      query: (body) => ({
        url: _API.CHAT.CREATE,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CHAT", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetChatListQuery, useCreateChatMutation, useViewChatQuery } =
  chatApiSlice;