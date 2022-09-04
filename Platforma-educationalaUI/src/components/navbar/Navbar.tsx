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
  return (
    <Nav>
      <NavLink to="/">
        <LogoCode />
        <Logo />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/users">Students</NavLink>
        <NavLink to="/">Game</NavLink>
        <NavLink to="/contact">Pagina</NavLink>
        <NavLink to="/pagina">Pagina</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/signin">Sign In</NavBtnLink>
      </NavBtn>
    </Nav>
  );
}
