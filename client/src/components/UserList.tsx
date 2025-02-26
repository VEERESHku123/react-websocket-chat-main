import React from "react";

interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div style={{ width: "100%" }}>
      {" "}
      <h3>Users in Room</h3>
      <ul className="user">
        {users.map((user, idx) => (
          <li key={idx}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
