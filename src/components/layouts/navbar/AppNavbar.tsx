import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { authNavLinks, isAuth } from "./AppNavbar.helper";
import { useMemo } from "react";

const AppNavbar = () => {
  const RenderLinks = useMemo(() => {
    return authNavLinks.map(({ path, title }, index) => (
      <NavLink
        key={index}
        to={path}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        {title}
      </NavLink>
    ));
  }, []);

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='/' className='text-capitalize'>
          chat with <span className='text-uppercase'>ai</span>
        </Navbar.Brand>
      </Container>

      <Navbar.Toggle aria-controls='navbar-collapse' />

      <Navbar.Collapse id='navbar-collapse'>
        <Nav className='me-auto'>{RenderLinks}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
