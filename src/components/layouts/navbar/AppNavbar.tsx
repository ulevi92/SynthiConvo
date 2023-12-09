import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { authNavLinks, isAuth } from "./AppNavbar.helper";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import Icon from "../../Icon";
import { setDarkMode } from "../../../redux/features/global/globalSlice";
import { fetchSignOut } from "../../../redux/features/authUser/authUserSlice";
import MobileNavbar from "../side navbar/MobileNavbar";

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
    <>
      <MobileNavbar />
    </>
  );
};

export default AppNavbar;
