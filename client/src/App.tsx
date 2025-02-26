import { useState } from "react";
import "./App.css";
import Operation from "./components/Operation";
import ClientChat from "./components/ClientChat";
import UserList from "./components/UserList";

const App: React.FC = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);

  const handleUserEnter = (name: string) => {
    setEntered(true);
    setName(name);
  };

  const handleUserLeave = () => {
    setEntered(false);
    setName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      {!entered ? (
        <div className="enter-area">
          <Operation
            onEnter={handleUserEnter}
            onLeave={handleUserLeave}
            entered={entered}
          />
        </div>
      ) : (
        <div>
          <div className="header">
            <span className="name">{name}</span>
            <button onClick={handleUserLeave}>Leave</button>
          </div>
          <UserList users={users} />
          <ClientChat name={name} setUsers={setUsers} />
        </div>
      )}
    </div>
  );
};

export default App;
