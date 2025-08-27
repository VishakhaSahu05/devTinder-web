import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?.id;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Use a ref to hold the socket instance.
  const socketRef = useRef(null);
  const fetchChatMessages = async () => {
  const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
    withCredentials: true,
  });

  console.log(chat.data.messages);

  const chatMessages = chat?.data?.messages.map((msg) => {
    return {
      senderId: msg?.senderId?._id,
      firstName: msg?.senderId?.firstName,
      lastName: msg?.senderId?.LastName,
      text: msg?.text,
      time: new Date(msg?.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  setMessages(chatMessages);
}; // <-- closes fetchChatMessages properly
useEffect(() => {
  if (userId && targetUserId) {
    fetchChatMessages();
  }
}, [userId, targetUserId]);
  useEffect(() => {
    if (!userId || !targetUserId) return;

    if (!socketRef.current) {
      const newSocket = io("http://localhost:5000");
      socketRef.current = newSocket;

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      newSocket.on("connect_error", (err) => {
        console.log("Connection Error:", err.message);
      });
    }

    const socket = socketRef.current;

    // Join the sorted room
    socket.emit("joinChat", { userId, targetUserId });

    const handleReceiveMessage = (message) => {
      console.log("Received a message on client:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = socketRef.current;
    if (!socket || !input.trim()) return;

    const messageData = {
      senderId: userId,
      receiverId: targetUserId,
      firstName: user.firstName,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("sendMessage", messageData);

    setInput("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-xl overflow-hidden">
      <h1 className="p-5 border-b border-gray-600 text-xl font-bold">Chat</h1>

      <div className="flex-1 overflow-y-auto p-5 bg-base-200 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.senderId === userId ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-bubble">
              <div className="font-semibold">{msg.firstName}</div>
              <div>{msg.text}</div>
              <div className="text-xs text-right text-gray-500">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-base-300 flex gap-3 items-center border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="btn btn-primary rounded-full px-6 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
