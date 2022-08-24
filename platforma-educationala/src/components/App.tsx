import { Route, Routes } from "react-router-dom";
import Game from "../pages/Game";
import BlockyMain from "./BlockyMain";
import Result from "./compiler/Result";
import {Navbar} from "./navbar/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path ="/" element={<Game />}/>
    </Routes>
    </>
  );
}

export default App;
