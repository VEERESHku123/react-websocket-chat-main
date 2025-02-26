import React from "react";

interface MessageProps {
  name: string;
  text: string;
  isSelf: boolean;
}

const Message: React.FC<MessageProps> = ({ name, text, isSelf }) => {
  return (
    <li className={isSelf ? "self" : "other"}>
      <div className={`message ${isSelf ? "self" : "other"}`}>
        <span className="name">{name}</span>
        <span className="text">{text}</span>
      </div>
    </li>
  );
};

export default Message;
