import _axios, { AxiosInstance } from "axios";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { Auth, SERVER_URL } from "../config";

const useAxiosJWT = () => {
  const [headers, setHeaders] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const hasToken = await getItemAsync(Auth.KEY);
        if (hasToken) {
          setHeaders({ ...headers, Authorization: `Bearer ${hasToken}` });
        }
      } catch (e) {
        console.log({ e });
      }
    };

    getAuthToken();
  }, []);

  return _axios.create({
    baseURL: SERVER_URL,
    headers,
  });
};

export default useAxiosJWT;
