import { useContext, useId } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import { Nav, NavLink, Bars, NavMenu, NavBtn, Logo, LogoCode } from "./NavbarElements";
import Menu from "./components/Menu";
import { useLocation } from "react-router-dom";
import Button from "./components/Button";
import { createProject } from "../../services/projectAPI";
import { ProjectSave } from "../../models/project/Project";
import config from "../../config";

export function Navbar() {
  const { isAuthentificated, isTeacher } = useContext(UserContext);
  const { pathname } = useLocation();
  const id = useId();
  const navigator = useNavigate();

  if (pathname.startsWith("/Login") || pathname.startsWith("/Signin")) {
    return null;
  }

  const handleNewProject = async () => {
    const url = `${config.baseApiUrl}/Projects`;
    const currentTime = new Date().toLocaleTimeString();
    const projectDefault: ProjectSave = { name: `proiect nou ${currentTime}` };
    const response = await createProject(url, projectDefault, isTeacher);
    if (response?.responseStatus == 200) {
      navigator(`/Proiecte/${response.id}`);
    }
  };

  if (isAuthentificated) {
    return (
      <Nav>
        <NavLink to="/">
          <LogoCode />
          <Logo />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/Proiecte">Proiectele mele</NavLink>
          {isTeacher && <NavLink to="/Editor">Editor</NavLink>}
          <NavLink to="" onClick={handleNewProject}>
            Proiect nou
          </NavLink>
          <NavLink to="/Grupe">Grupe</NavLink>
        </NavMenu>
        <NavBtn>
          <Menu />
        </NavBtn>
      </Nav>
    );
  }

  return (
    <Nav className="justify-between">
      <div className="flex ">
        <NavLink to="/">
          <LogoCode />
          <Logo />
        </NavLink>
        <NavLink to="/Despre">Despre</NavLink>
      </div>
      <div className="flex justify-center gap-2">
        <Button
          variant="general"
          onClick={() => {
            navigator("/Login/Student");
          }}
        >
          <span>Intra in cont</span>
        </Button>
        <Button
          variant="general"
          onClick={() => {
            navigator("/Signin");
          }}
        >
          <span>Alatura-te</span>
        </Button>
      </div>
    </Nav>
  );
}
