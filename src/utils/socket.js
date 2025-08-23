import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  const socket = io(BASE_URL, {
    transports: ["websocket"], // force WebSocket
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("✅ Connected to socket.io:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });

  return socket;
};
