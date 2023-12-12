import { FC, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import Icon from "../../Icon";
import { setDarkMode } from "../../../redux/features/global/globalSlice";

const MobileNavbar: FC = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const { darkMode, email, credit } = useAppSelector((state) => ({
    darkMode: state.global.darkMode,
    email: state.userData.userProfile.email,
    credit: state.userData.chat.credit.total,
  }));
  const dispatch = useAppDispatch();

  const toggleIcon = (
    <>
      <div className='dot my-1'></div>
      <div className='dot my-1'></div>
      <div className='dot my-1'></div>
    </>
  );

  return (
    <Navbar
      className='p-0 d-block d-md-none'
      variant='dark'
      expand='md'
      bg={`${darkMode ? "secondary" : "primary"}`}
    >
      <Container>
        <Navbar.Brand href='/' className='text-capitalize'>
          chat with <span className='text-uppercase'>ai</span>
        </Navbar.Brand>

        <div>
          <Navbar.Toggle aria-controls='mobile-collapse' className='mx-1' />

          <Icon
            color={`${!darkMode ? "#FFFF99" : "#FFFFE0"}`}
            iconName={`${!darkMode ? "SunFill" : "MoonFill"}`}
            size='25'
            onClick={() => dispatch(setDarkMode(!darkMode))}
          />
        </div>

        <Navbar.Collapse id='mobile-collapse'>
          <Nav navbarScroll className='flex-grow-1'>
            <div>hello: {email}</div>
            <div>available credit: {credit}</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MobileNavbar;
