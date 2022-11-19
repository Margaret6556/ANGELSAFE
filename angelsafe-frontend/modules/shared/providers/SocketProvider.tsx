import React, { createContext, useContext, useEffect, useMemo } from "react";
import { ChildrenProps } from "../types";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../hooks";
import logger from "../utils/logger";
import { APP_URL } from "../config";

interface SocketProviderProps extends ChildrenProps {}
interface SocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContext>({} as SocketContext);

const SocketProvider = ({ children }: SocketProviderProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const socket = useMemo(() => {
    if (user?.token) {
      return io(APP_URL, {
        extraHeaders: {
          token: user.token,
        },
      });
    }

    return null;
  }, [user?.token]);

  useEffect(() => {
    if (socket) {
      if (socket.disconnected) {
        socket.connect();
      }

      socket.on("connect", function () {
        logger("chat", "Socket connected");
      });

      socket.on("disconnect", function () {
        logger("chat", "Socket disconnected");
      });
    }

    return () => {
      if (socket?.connected) {
        socket.offAny();
        socket?.disconnect();
        logger("chat", `Socket closed - ${socket.disconnected}`);
      }
    };
  }, [socket]);

  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
export const useSocketContext = () => useContext(SocketContext);
