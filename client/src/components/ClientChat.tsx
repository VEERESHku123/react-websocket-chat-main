import { useState, ChangeEvent, useEffect } from "react";
import Message from "./Message";
import useChatService from "../hooks/useChatService";

interface ClientChatProps {
  name: string;
  setUsers: (users: string[]) => void;
}


const ClientChat: React.FC<ClientChatProps> = ({ name, setUsers }) => {
  const [messages, sendMessage, connect] = useChatService(
    {
      name: "chat service",
      text: `Welcome ${name}`,
    },
    setUsers
  );

  const [text, setText] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    sendMessage(name, text);
    setText("");
  };

  useEffect(() => {
    connect(name);
  }, [name, connect]);

  return (
    <div style={{ width: "100%" }}>
      <ul className="messagelist">
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            name={msg.name}
            text={msg.text}
            isSelf={msg.name === name}
          />
        ))}
      </ul>
      <div className="input">
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={handleInputChange}
        />
        <button disabled={!text} onClick={handleButtonClick}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ClientChat;
