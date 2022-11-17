import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChildrenProps } from "../types";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../hooks";
import logger from "../utils/logger";
import { AppState } from "react-native";

interface SocketProviderProps extends ChildrenProps {}

type CallbackType = (args?: any) => void;

interface SocketContext {
  socket: Socket;
  handleSetCb: CallbackType;
}

const SocketContext = createContext<SocketContext>({} as SocketContext);

const MESSAGE = "new-message";

const SocketProvider = ({ children }: SocketProviderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [cb, setCb] = useState<CallbackType>(() => () => {});
  const socket = useMemo(
    () =>
      io("http://mobile.angelsafe.co", {
        extraHeaders: {
          token: user?.token || "",
        },
      }),
    []
  );

  useEffect(() => {
    if (user?.token) {
      socket.connect();
      socket.on("connect", function () {
        logger("chat", "Socket connected");
        if (cb) {
          cb();
        }
      });

      socket.on("disconnect", function () {
        logger("chat", "Socket disconnected");
      });

      socket.on(MESSAGE, function () {
        logger("chat", "new message received");
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [user?.token]);

  const handleSetCb = (cb: CallbackType) => {
    setCb(cb);
  };

  const value = {
    socket,
    handleSetCb,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
export const useSocketContext = () => useContext(SocketContext);
