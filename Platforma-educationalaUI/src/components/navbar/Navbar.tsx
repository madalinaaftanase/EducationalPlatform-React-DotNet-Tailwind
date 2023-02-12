import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, Logo, LogoCode } from "./NavbarElements";

export function Navbar() {
  const { name } = useContext(UserContext);
  return (
    <Nav>
      <NavLink to="/">
        <LogoCode />
        <Logo />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/Proiecte">Proiecte</NavLink>
        <NavLink to="/Joc">Joc nou</NavLink>
        <NavLink to="/Contact">Pagina 1</NavLink>
        <NavLink to="/Pagina">Pagina 2</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/Signin">Bine ai venit,{name}</NavBtnLink>
      </NavBtn>
    </Nav>
  );
}
