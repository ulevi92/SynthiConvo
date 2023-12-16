import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";
import SidebarCard from "./SidebarCard";

const MobileBar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const darkMode = useAppSelector((state) => state.global.darkMode);

  const handleMenu = () => setOpenMenu((menu) => !menu);

  const menuButtonClassName = !openMenu
    ? "position-absolute d-block bottom-50 start-0 z-3"
    : "d-none";

  const menuContainderClassName = openMenu
    ? `position-absolute h-100 w-100 d-flex flex-column opacity-75 z-3 ${
        darkMode ? "bg-light-subtle" : "bg-dark-subtle"
      }`
    : `position-absolute h-0 w-0 d-none`;

  return (
    <>
      <div className={menuButtonClassName}>
        <Button variant='p-2' onClick={handleMenu}>
          <div className='dot mt-2' />
          <div className='dot my-2' />
          <div className='dot mb-2' />
        </Button>
      </div>

      <div
        className={menuContainderClassName}
        style={{ transition: "all 0.35s ease-in-out" }}
      >
        <Button
          variant={darkMode ? "light" : "dark"}
          className='align-self-end rounded-circle m-3'
          onClick={handleMenu}
        >
          X
        </Button>

        <div className='d-flex flex-column justify-content-center flex-grow-1 mx-5'>
          <SidebarCard cardName='about' clickable cardMarginB={1} />
          <SidebarCard cardName='account' cardMarginY={1} clickable />
          <SidebarCard
            cardName='clear conversation'
            cardMarginY={1}
            clickable
          />
          <SidebarCard cardName='dark mode' cardMarginY={1} clickable />
          <SidebarCard cardName='logout' clickable cardMarginT={1} />
        </div>
      </div>
    </>
  );
};

export default MobileBar;
