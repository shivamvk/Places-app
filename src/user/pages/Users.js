import React from "react";

import UserList from "../components/UserList";
import "./Users.css";

const Users = (props) => {
  return (
    <div className="center">
      <UserList items={props.items} />
    </div>
  );
};

export default Users;
