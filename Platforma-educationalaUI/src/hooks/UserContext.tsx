import React, { useState } from "react";
import { getCookie } from "../utilities/cookieFunctions";

interface UserContextInterface {
  isAuthentificated: boolean;
  name: string | undefined;
  setToken: Function;
}

export const UserContext = React.createContext<UserContextInterface>({
  isAuthentificated: false,
  name: undefined,
  setToken: () => {},
});

interface UserContextProviderInterface {
  children: React.ReactNode;
}

function UserContextProvider({ children }: UserContextProviderInterface) {
  const [isAuthentificated, setIsAuthentificated] = useState(getCookie("token")==null?false:true);
  const [userName, setUserName] = useState("");

  const setToken = () => {
    setIsAuthentificated(true);
    setUserName(" Madalina");
  };

  return (
    <UserContext.Provider value={{ isAuthentificated, name: userName, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
