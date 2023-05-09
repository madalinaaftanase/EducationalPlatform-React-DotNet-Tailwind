import React, { useState, useEffect } from "react";
import { getCookie } from "../utilities/cookieFunctions";

interface UserContextInterface {
  isAuthentificated: boolean;
  username: string | undefined;
  isTeacher: boolean;
  idTeacher: string;
  setToken: Function;
  setUsername: Function;
  setIsTeacher: Function;
  setIdTeacher: Function;
}

export const UserContext = React.createContext<UserContextInterface>({
  isAuthentificated: false,
  username: undefined,
  isTeacher: false,
  idTeacher: "",
  setIsTeacher: () => {},
  setToken: () => {},
  setUsername: () => {},
  setIdTeacher: () => {},
});

interface UserContextProviderInterface {
  children: React.ReactNode;
}

function UserContextProvider({ children }: UserContextProviderInterface) {
  const [isAuthentificated, setIsAuthentificated] = useState(!!getCookie("token"));
  const [username, setUsername] = useState("");
  const [idTeacher, setIdTeacher] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  const setToken = () => {
    setIsAuthentificated(true);
  };

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    setUsername(localStorage.getItem("username") || "");
    setIdTeacher(localStorage.getItem("idTeacher") || "");
    if (localStorage.getItem("idTeacher")) {
      setIsTeacher(true);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthentificated,
        username: username,
        isTeacher,
        idTeacher,
        setToken,
        setUsername,
        setIsTeacher,
        setIdTeacher,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
