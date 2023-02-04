import { useContext } from "react";
import {UserContext} from "../../hooks/UserContext";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Logo,
  LogoCode,
} from "./NavbarElements";

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
        <NavLink to="/Joc">Game</NavLink>
        <NavLink to="/Contact">Pagina</NavLink>
        <NavLink to="/Pagina">Pagina</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/Signin">Bine ai venit,{name}</NavBtnLink>
      </NavBtn>
    </Nav>
  );
}
