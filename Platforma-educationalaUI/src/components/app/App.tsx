import { Route, Routes } from "react-router-dom";
import Game from "../../pages/Game";
import Signin from "../../pages/Signin";
import swrConfig from "../../swrConfig";
import { SWRConfig } from "swr";
import {Navbar} from "../navbar/Navbar";
import "./App.css";
import Users from "../../pages/Users";

function App() {
  return (
    <>
    <SWRConfig value={swrConfig}>
    <Navbar />
    <Routes>
      <Route path ="/" element={<Game />}/>
      <Route path="/signin" element={<Signin />} />
      <Route path="/users" element ={<Users />} />
    </Routes>
    </SWRConfig>
    </>
  );
}

export default App;
