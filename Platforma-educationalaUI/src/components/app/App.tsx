import { Route, Routes, useNavigate } from "react-router-dom";
import Project from "../../pages/Project";
import swrConfig from "../../swrConfig";
import { SWRConfig } from "swr";
import { Navbar } from "../navbar/Navbar";
import "./App.css";
import Students from "../../pages/Students";
import LoginPage from "../../pages/Login";
import Signin from "../../pages/Signin";
import ErrorResponse from "../ErrorResponse";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import ProjectLayout from "../../pages/ProjectLayout";

function App() {
  const navigator = useNavigate();
  const { isAuthentificated } = useContext(UserContext);

  if (isAuthentificated) {
    return (
      <SWRConfig value={swrConfig}>
        <Navbar />
        <Routes>
          <Route path="/Joc" element={<Project />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Login/Student" element={<LoginPage />} />
          <Route path="/Login/Teacher" element={<LoginPage />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/Proiecte" element={<ProjectLayout />} />
          <Route path="/Error" element={<ErrorResponse />} />
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
        <Route path="/Login/Teacher" element={<LoginPage />} />
        <Route path="/Error" element={<ErrorResponse />} />
      </Routes>
    </SWRConfig>
  );
}

export default App;
