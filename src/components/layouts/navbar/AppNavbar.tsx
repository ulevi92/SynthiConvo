import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { authNavLinks, isAuth } from "./AppNavbar.helper";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import Icon from "../../Icon";
import { setDarkMode } from "../../../redux/features/global/globalSlice";
import { fetchSignOut } from "../../../redux/features/auth/authSlice";

const AppNavbar = () => {
  const isUserAuthenticated = useAppSelector((state) => state.auth.isAuth);
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const dispatch = useAppDispatch();

  const RenderLinks = () =>
    authNavLinks.map(({ path, title }, index) => (
      <NavLink
        key={index}
        to={path}
        className={({ isActive, isPending }) => {
          const defaultStyle =
            "text-capitalize  text-white mx-1 px-1 d-flex align-self-center text-decoration-none";

          return isPending
            ? `${defaultStyle}`
            : isActive
            ? `${defaultStyle} fw-bolder text-danger`
            : defaultStyle;
        }}
      >
        {title}
      </NavLink>
    ));

  const signoutClass = isUserAuthenticated
    ? "fw-bold text-capitalize"
    : "d-none";

  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='/' className='text-capitalize'>
          chat with <span className='text-uppercase'>ai</span>
        </Navbar.Brand>
      </Container>

      <Navbar.Toggle aria-controls='navbar-collapse' />

      <Navbar.Collapse id='navbar-collapse'>
        <Nav className='me-auto'>
          <>
            {RenderLinks()}

            <NavLink to='/' className={signoutClass}>
              <Button
                className={signoutClass}
                onClick={() => dispatch(fetchSignOut())}
              >
                signout
              </Button>
            </NavLink>

            <Icon
              color={`${!darkMode ? "rgba(255,165,0,1" : ""}`}
              iconName={`${!darkMode ? "SunFill" : "MoonFill"}`}
              size='20'
              onClick={() => dispatch(setDarkMode(!darkMode))}
            />
          </>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
