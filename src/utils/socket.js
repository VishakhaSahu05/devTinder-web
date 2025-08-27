import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socketInstance = null;

export const createSocketConnection = () => {
  if (!socketInstance) {
   
    
      // Production on EC2
      socketInstance = io("http://13.53.142.211:5000", {
        withCredentials: true,
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
