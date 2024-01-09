import { createContext, useContext, useEffect, useState } from "react";
import { chatService } from "../services/api";
const backendUrl = "http://172.18.9.170:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };
  const chat = async (message) => {
    setLoadingChat(true);
    const data = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const resp = (await data.json()).messages;
    setMessages((messages) => [...messages, ...resp]);
    setLoadingChat(false);
  };
  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]); //Se tiver mensagem, rodar a primeira
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loadingChat,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
