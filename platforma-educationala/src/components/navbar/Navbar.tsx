import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Logo,
} from "./NavbarElements";

export function Navbar() {
  return (
    <Nav>
      <NavLink to="/dsfdsf">
        <Logo />
        <Logo />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/about">About</NavLink>
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
