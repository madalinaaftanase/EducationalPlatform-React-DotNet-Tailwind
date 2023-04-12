import React, { useState, useEffect } from "react";
import { getCookie } from "../utilities/cookieFunctions";

interface UserContextInterface {
  isAuthentificated: boolean;
  username: string | undefined;
  isTeacher: boolean;
  setToken: Function;
  setUsername: Function;
  setIsTeacher: Function;
}

export const UserContext = React.createContext<UserContextInterface>({
  isAuthentificated: false,
  username: undefined,
  isTeacher: false,
  setIsTeacher: () => {},
  setToken: () => {},
  setUsername: () => {},
});

interface UserContextProviderInterface {
  children: React.ReactNode;
}

function UserContextProvider({ children }: UserContextProviderInterface) {
  const [isAuthentificated, setIsAuthentificated] = useState(!!getCookie("token"));
  const [username, setUsername] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  const setToken = () => {
    setIsAuthentificated(true);
  };

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    setUsername(localStorage.getItem("username") || "");
  };

  return (
    <UserContext.Provider
      value={{
        isAuthentificated,
        username: username,
        isTeacher,
        setToken,
        setUsername,
        setIsTeacher,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
