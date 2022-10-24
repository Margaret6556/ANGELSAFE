import base64 from "react-native-base64";
import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse } from "../types";

export type ProfileRegisterType = {
  username: string;
  year: string;
  country: string;
  gender: string;
};

type ChatListResponse = {
  id: string;
  receiver: { [key: string]: any };
  read: number;
  lastMessage: string;
};

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query<BackendResponse<ChatListResponse>, void>({
      query: () => _API.CHAT.LIST,
      providesTags: ["PROFILE"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetChatListQuery } = chatApiSlice;
