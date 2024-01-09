import { createContext, useContext, useEffect, useState } from "react";
import { chatService } from "../services/api";
const backendUrl = "http://172.18.9.170:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };
  const chat = async (message) => {
    setLoadingChat(true);
    await chatService(message).then((response)=>{
      let newMessages = response.data.messages
      setMessages((messages) => [...messages, ...newMessages]);
      setLoadingChat(false);
    }).catch(error=>console.log(error))
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
