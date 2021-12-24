import React, { useState, createContext } from "react";

// Create a context
export const Context = createContext();

// Create a context provider
const UserProvider = ({ children }) => {
  const [data, setData] = useState(undefined);

  return (
    <Context.Provider value={[data, setData]}>{children}</Context.Provider>
  );
};

export default UserProvider;
