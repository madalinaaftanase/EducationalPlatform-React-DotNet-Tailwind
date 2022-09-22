import { Route, Routes, useNavigate } from "react-router-dom";
import Game from "../../pages/Game";
import swrConfig from "../../swrConfig";
import { SWRConfig } from "swr";
import { Navbar } from "../navbar/Navbar";
import "./App.css";
import Students from "../../pages/Students";
import LoginPage from "../../pages/Login";
import Signin from "../../pages/Signin";
import ErrorResponse from "../ErrorResponse";
import { useContext, useEffect } from "react";
import { UserContext } from "../../hooks/UserContext";

function App() {
  const navigator = useNavigate();
  const { isAuthentificated } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthentificated) {
      navigator("/login/student");
    }
  }, [isAuthentificated]);

  return (
    <SWRConfig value={swrConfig}>
      {isAuthentificated && <Navbar />}
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login/student" element={<LoginPage />} />
        <Route path="/login/teacher" element={<LoginPage />} />
        <Route path="/students" element={<Students />} />
        <Route path="/error" element={<ErrorResponse />} />
      </Routes>
    </SWRConfig>
  );
}

export default App;
