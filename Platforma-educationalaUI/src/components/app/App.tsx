import { Route, Routes } from "react-router-dom";
import Game from "../../pages/Game";
import swrConfig from "../../swrConfig";
import { SWRConfig } from "swr";
import {Navbar} from "../navbar/Navbar";
import "./App.css";
import Users from "../../pages/Users";
import LoginPage from "../../pages/Login";
import { useState } from "react";
import Signin from "../../pages/Signin";

function App() {
  const[isLogged, setIsLogged]= useState(true);

  return (
    <>
    <SWRConfig value={swrConfig}>
    {isLogged && <Navbar />}
    <Routes>
      <Route path ="/" element={<Game />}/>
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element ={<Users />} />
    </Routes>
    </SWRConfig>
    </>
  );
}

export default App;