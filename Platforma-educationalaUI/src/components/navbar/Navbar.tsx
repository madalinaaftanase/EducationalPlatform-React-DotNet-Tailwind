import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import { Nav, NavLink, Bars, NavMenu, NavBtn, Logo, LogoCode } from "./NavbarElements";
import Menu from "./components/Menu";
import { useLocation } from "react-router-dom";
import Button from "./components/Button";
import EditorHtml from "../../pages/EditorHtml";

export function Navbar() {
  const { isAuthentificated, isTeacher } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigator = useNavigate();

  if (pathname.startsWith("/Login") || pathname.startsWith("/Signin")) {
    return null;
  }

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
          {isTeacher &&<NavLink to="/Editor">Editor</NavLink>}
          <NavLink to="/Joc">Proiect nou</NavLink>
          <NavLink to="/Grupe">Grupe</NavLink>
          {!isTeacher && <NavLink to="/Antreneaza">Antreneaza-te</NavLink>}
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
