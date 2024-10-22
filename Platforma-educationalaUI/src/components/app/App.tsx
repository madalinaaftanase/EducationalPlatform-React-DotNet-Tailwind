import { Route, Routes } from "react-router-dom";
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
import Profile from "../../pages/Profile";
import Group from "../../pages/Group";
import About from "../../pages/About";
import Home from "../../pages/Home";
import EditorHtml from "../../pages/EditorHtml";

function App() {
  const { isAuthentificated } = useContext(UserContext);

  if (isAuthentificated) {
    return (
      <SWRConfig value={swrConfig}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Login/Student" element={<LoginPage />} />
          <Route path="/Login/Profesor" element={<LoginPage />} />
          <Route path="/Studenti" element={<Students />} />
          <Route path="/Proiecte" element={<Projects />} />
          <Route path="/Proiecte/:id" element={<Project />} />
          <Route path="/Error" element={<ErrorResponse />} />
          <Route path="/Grupe" element={<Groups />} />
          <Route path="/Grupe/:id" element={<Group />} />
          <Route path="/Profil" element={<Profile />} />
          <Route path="/Studenti/:id/Proiecte" element={<Projects />} />
          <Route path="/Editor" element={<EditorHtml />} />
          <Route
            path="/Studenti/:studentId/Proiecte/:id"
            element={<Project isTeacherOverride={false} />}
          />
          <Route path="/Despre" element={<About />} />
        </Routes>
      </SWRConfig>
    );
  }

  return (
    <SWRConfig value={swrConfig}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Login/Student" element={<LoginPage />} />
        <Route path="/Login/Profesor" element={<LoginPage />} />
        <Route path="/Error" element={<ErrorResponse />} />
        <Route path="/Despre" element={<About />} />
      </Routes>
    </SWRConfig>
  );
}

export default App;
