import { io } from "socket.io-client";

let socketInstance = null;

export const createSocketConnection = () => {
  if (!socketInstance) {
    const SOCKET_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : window.location.origin; // production domain

    socketInstance = io(SOCKET_URL, {
      withCredentials: true,
      path: "/socket.io", // default path
    });

    socketInstance.on("connect", () => {
      console.log("Connected to socket.io:", socketInstance.id);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
  }

  return socketInstance;
};
