import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { authNavLinks, isAuth } from "./AppNavbar.helper";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import Icon from "../../Icon";
import { setDarkMode } from "../../../redux/features/global/globalSlice";
import { fetchSignOut } from "../../../redux/features/authUser/authUserSlice";

const AppNavbar = () => {
  const isUserAuthenticated = useAppSelector(
    (state) => state.authUser.auth.isAuth
  );
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const dispatch = useAppDispatch();

  const RenderLinks = () =>
    authNavLinks.map(({ path, title }, index) => (
      <NavLink
        key={index}
        to={path}
        className={({ isActive, isPending }) => {
          const defaultStyle =
            "text-capitalize  text-white flex-wrap align-content-center mx-md-1 px-1 d-flex text-decoration-none mb-1 mb-md-0";

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
    <Navbar
      bg={`${darkMode ? "secondary" : "primary"}`}
      variant='dark'
      expand='md'
    >
      <Container className='px-2'>
        <Navbar.Brand href='/' className='text-capitalize'>
          chat with <span className='text-uppercase'>ai</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='navbar-collapse' />

        <Navbar.Collapse id='navbar-collapse'>
          <Nav className='flex-grow-1'>
            <div className='d-flex flex-column flex-md-row flex-grow-1'>
              {RenderLinks()}

              <div className='d-flex flex-column flex-md-row flex-grow-1 align-items-start justify-content-md-end align-items-md-center'>
                <NavLink
                  to='/'
                  className='d-flex justify-content-start mb-1 mb-md-0'
                >
                  <Button
                    className={signoutClass}
                    onClick={() => dispatch(fetchSignOut())}
                    variant={darkMode ? "outline-light" : "outline-warning"}
                  >
                    signout
                  </Button>
                </NavLink>

                <Icon
                  color={`${!darkMode ? "rgba(255,165,0,1" : ""}`}
                  iconName={`${!darkMode ? "SunFill" : "MoonFill"}`}
                  size='25'
                  onClick={() => dispatch(setDarkMode(!darkMode))}
                />
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
