import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  name: string;
  text: string;
}


const useChatService = (
  initialMessage: Message,
  setUsers: (users: string[]) => void
): [
  Message[],
  (name: string, text: string) => void,
  (name: string) => void
] => {

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const socketRef = useRef<Socket | null>(null);

  
  useEffect(() => {
    // socket.io-client 
    socketRef.current = io("http://localhost:3001");
    // 'broadcast'
    socketRef.current.on("broadcast", (payload: Message) => {
      setMessages((prevMessages) => [...prevMessages, payload]);
    });
    socketRef.current.on("updateUserList", (users: string[]) => {
      setUsers(users);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, [setUsers]);

 
  const sendMessage = (name: string, text: string) => {
    const chatMessage: Message = {
      name: name,
      text: text,
    };
    socketRef.current?.emit("send", chatMessage);
    setMessages((prevMessages) => [...prevMessages, chatMessage]);
  };

  const connect = (name: string) => {
    socketRef.current?.emit("enter", name);
  };

  return [messages, sendMessage, connect];
};

export default useChatService;
