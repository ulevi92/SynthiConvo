import { CSSProperties, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";
import SidebarCard from "./SidebarCard";

import "./mobile-menu.scss";

const MobileMenu = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const darkMode = useAppSelector((state) => state.global.darkMode);
  const displayName = useAppSelector(
    (state) => state.userData.userProfile.displayName
  );
  const credit = useAppSelector((state) => state.userData.chat.credit);

  const email = useAppSelector((state) => state.userData.userProfile.email);

  const handleMenu = () => setOpenMenu((menu) => !menu);

  const menuButtonClassName = !openMenu
    ? "position-absolute d-block bottom-50 start-0 z-3"
    : "d-none";

  const menuContainerClass = `menu-container ${openMenu ? "open" : ""} ${
    darkMode ? "bg-light-subtle" : " bg-dark-subtle"
  }`;

  const mobileBarMenuClass = darkMode ? "mobile-bar light" : "mobile-bar dark";

  return (
    <>
      <div className={menuButtonClassName}>
        <Button
          variant='none'
          className='d-flex flex-column'
          onClick={handleMenu}
        >
          <div className={`${mobileBarMenuClass}`} />
          <div className={`${mobileBarMenuClass} my-2`} />
          <div className={`${mobileBarMenuClass}`} />
        </Button>
      </div>

      <div className={menuContainerClass}>
        <div className='d-flex justify-content-between'>
          <h1 className='align-self-center ms-5'>SynthiConvo</h1>

          <Button
            variant={darkMode ? "light" : "dark"}
            className='align-self-end rounded-circle m-3'
            onClick={handleMenu}
            size='lg'
          >
            X
          </Button>
        </div>

        <div className='d-flex flex-column justify-content-between flex-grow-1 m-5'>
          <div className='user-profile'>
            <div className={`profile ${darkMode ? "dark" : "light"}`}>
              <h1 className='text-uppercase'>
                {displayName?.slice(0, 1) || ""}
              </h1>
            </div>

            <div className='align-self-center ms-2 text-capitalize'>
              <h3>welcome: {displayName}</h3>
              <p className='text-lowercase'>{email}</p>
              <h6>credit left: {credit}</h6>
            </div>
          </div>

          <div className='card-slots d-flex flex-column flex-grow-1 align-items-start mt-5'>
            <SidebarCard
              cardName='about'
              clickable
              cardMarginB={1}
              padding={5}
            />
            <SidebarCard
              cardName='clear conversation'
              cardMarginY={1}
              clickable
              padding={5}
            />
            <SidebarCard
              cardName='dark mode'
              cardMarginY={1}
              clickable
              padding={5}
            />
            <SidebarCard
              cardName='logout'
              clickable
              cardMarginT={1}
              padding={5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
