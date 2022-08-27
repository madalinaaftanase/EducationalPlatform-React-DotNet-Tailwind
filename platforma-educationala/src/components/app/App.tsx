import { Route, Routes } from "react-router-dom";
import Game from "../../pages/Game";
import Signin from "../../pages/Signin";
import {Navbar} from "../navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path ="/" element={<Game />}/>
      <Route path="/signin" element={<Signin />} />
    </Routes>
    </>
  );
}

export default App;
