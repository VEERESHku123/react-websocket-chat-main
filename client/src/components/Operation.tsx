import { useState, ChangeEvent } from "react";

interface OperationProps {
  entered: boolean;
  onEnter: (name: string) => void;
  onLeave: () => void;
}

export default function Operation(props: OperationProps) {
  const [name, setName] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEnterClick = () => {
    props.onEnter(name);
  };


  const renderButton = () => {
    if (props.entered) {
      return <button onClick={props.onLeave}>Leave</button>;
    }
    return (
      <button disabled={!name} onClick={handleEnterClick}>
        Join
      </button>
    );
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Enter your name..."
        value={name}
        disabled={props.entered}
        onChange={handleInputChange}
      />

      {renderButton()}
    </div>
  );
}
