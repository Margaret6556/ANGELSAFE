import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import React, { useEffect } from "react";
import { useAppDispatch } from ".";
import { Auth, _API } from "../config";
import { setLoggedIn, setUser } from "../state/reducers/auth";
import { BackendResponse } from "../types";
import SessionManager from "../utils/auth/SessionManager";
// import useAxios from "./useAxios";

const useRestoreSession = () => {
  const dispatch = useAppDispatch();
  // const api = useAxios();

  useEffect(() => {
    const getSession = async () => {
      try {
        const token = await SessionManager.getToken();

        if (token) {
          const {
            data: {
              data: { username },
            },
          } = await axios.get<
            BackendResponse<{
              username: string;
              profilePic: string;
              year: string;
              gender: string;
              country: string;
            }>
          >(_API.PROFILE.INFO, {
            headers: await SessionManager.setHeader(),
          });

          console.log({ username });
          dispatch(
            setUser({
              username,
            })
          );
          dispatch(setLoggedIn(true));
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log({ e: e.message, f: e.response?.data.message });
        }
      }
    };

    getSession();
  }, []);
  return null;
};

export default useRestoreSession;
