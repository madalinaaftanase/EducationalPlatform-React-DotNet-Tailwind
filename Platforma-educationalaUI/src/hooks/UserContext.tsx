import React, { useState } from "react";

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
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [userName, setUserName] = useState("");

  const setToken = (token: string) => {
    setIsAuthentificated(true);
    setUserName("Madalina");
    // ia numele din token si il seteaza
  };

  return (
    <UserContext.Provider value={{ isAuthentificated, name: userName, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
