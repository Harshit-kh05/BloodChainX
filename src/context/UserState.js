import React, { useState } from "react";
import GlobalUserContext from "./GlobalUserContext";

export default function UserState(props) {
  const [user, setUser] = useState({});

  const setUserHelper = (user) => {
    setUser(user);
  };

  return (
    <GlobalUserContext.Provider value={{ user, setUserHelper }}>
      {props.children}
    </GlobalUserContext.Provider>
  );
};


