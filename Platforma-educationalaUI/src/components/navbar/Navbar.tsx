import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, Logo, LogoCode } from "./NavbarElements";

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
        <NavLink to="/Profil">Profilul meu</NavLink>
      </NavMenu>
      <NavBtn>
        <div>Bine ai venit,{name}</div>
      </NavBtn>
    </Nav>
  );
}
