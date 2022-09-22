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
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/">Game</NavLink>
        <NavLink to="/contact">Pagina</NavLink>
        <NavLink to="/pagina">Pagina</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/signin">Bine ai venit,{name}</NavBtnLink>
      </NavBtn>
    </Nav>
  );
}
