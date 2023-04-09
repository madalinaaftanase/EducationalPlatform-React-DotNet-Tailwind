import React, { useState } from "react";
import { getCookie } from "../utilities/cookieFunctions";

interface UserContextInterface {
  isAuthentificated: boolean;
  username: string | undefined;
  setToken: Function;
  setUsername: Function;
}

export const UserContext = React.createContext<UserContextInterface>({
  isAuthentificated: false,
  username: undefined,
  setToken: () => {},
  setUsername: () => {},
});

interface UserContextProviderInterface {
  children: React.ReactNode;
}

function UserContextProvider({ children }: UserContextProviderInterface) {
  const [isAuthentificated, setIsAuthentificated] = useState(!!getCookie("token"));
  const [username, setUsername] = useState("");

  const setToken = () => {
    setIsAuthentificated(true);
  };

  return (
    <UserContext.Provider value={{ isAuthentificated, username: username, setToken, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
