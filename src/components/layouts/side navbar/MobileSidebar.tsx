import { FC, useState } from "react";
import { Container } from "react-bootstrap";
import UserDetails from "./UserDetails";

interface props {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar: FC<props> = ({ openSidebar, setOpenSidebar }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const openMenuClassName = `${!openSidebar ? "d-flex" : "d-none"}`;

  const ShowMenuClassName = `${showSidebar ? "d-flex" : "d-none"}`;

  const handleOpenMenu = () => {
    setOpenSidebar(true);
    setShowSidebar(true);
  };

  return (
    <>
      <div
        className={`${openMenuClassName} flex-column flex-grow-1 justify-content-center align-items-center dot-container btn`}
        onClick={handleOpenMenu}
      >
        <div className='dot' />
        <div className='dot' />
        <div className='dot' />
      </div>

      <Container className={ShowMenuClassName}>
        <UserDetails userDisplayName />
        <UserDetails userEmail />
        <UserDetails userEmail />
      </Container>
    </>
  );
};

export default MobileSidebar;
