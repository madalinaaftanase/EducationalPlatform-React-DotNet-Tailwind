import { Route, Routes, useNavigate } from "react-router-dom";
import Project from "../../pages/Project";
import swrConfig from "../../swrConfig";
import { SWRConfig } from "swr";
import { Navbar } from "../navbar/Navbar";
import "./App.css";
import Students from "../../pages/Students";
import LoginPage from "../../pages/Login";
import Signin from "../../pages/Signin";
import ErrorResponse from "../common/ErrorResponse";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import Projects from "../../pages/Projects";
import Groups from "../../pages/Groups";

function App() {
  const navigator = useNavigate();
  const { isAuthentificated } = useContext(UserContext);

  if (isAuthentificated) {
    return (
      <SWRConfig value={swrConfig}>
        <Navbar />
        <Routes>
          <Route path="/Joc" element={<Project />} />
          <Route path="/" element={<Project />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Login/Student" element={<LoginPage />} />
          <Route path="/Login/Profesor" element={<LoginPage />} />
          <Route path="/Studenti" element={<Students />} />
          <Route path="/Proiecte" element={<Projects />} />
          <Route path="/Proiecte/:id" element={<Project />} />
          <Route path="/Error" element={<ErrorResponse />} />
          <Route path="/Grupe" element={<Groups />} />
        </Routes>
      </SWRConfig>
    );
  }

  return (
    <SWRConfig value={swrConfig}>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Login/Student" element={<LoginPage />} />
        <Route path="/Login/Profesor" element={<LoginPage />} />
        <Route path="/Error" element={<ErrorResponse />} />
      </Routes>
    </SWRConfig>
  );
}

export default App;
