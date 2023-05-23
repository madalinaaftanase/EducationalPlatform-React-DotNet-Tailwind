import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { Nav, NavLink, Bars, NavMenu, NavBtn, Logo, LogoCode } from "./NavbarElements";
import Menu from "./components/Menu";

export function Navbar() {
  const { username: name } = useContext(UserContext);
  return (
    <Nav>
      <NavLink to="/">
        <LogoCode />
        <Logo />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/Proiecte">Proiectele mele</NavLink>
        <NavLink to="/Joc">Proiect nou</NavLink>
        <NavLink to="/Grupe">Grupe</NavLink>
        <NavLink to="/Despre">Despre</NavLink>
        <NavLink to="/Antreneaza">Antreneaza-te</NavLink>
      </NavMenu>
      <NavBtn>
        <Menu />
      </NavBtn>
    </Nav>
  );
}
