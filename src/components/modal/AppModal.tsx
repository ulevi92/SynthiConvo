import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { closeModal } from "../../redux/features/global/globalSlice";
import { clearAuthErrors } from "../../redux/features/userData/userDataSlice";
import AppModalBody from "./AppModalBody";
import { Loader } from "../loader/Loader";

const AppModal = () => {
  const showModal = useAppSelector((state) => state.global.showModal);

  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearAuthErrors());
    dispatch(closeModal());
  };

  const modalSize: () => "sm" | "xl" = () => {
    switch (modalType) {
      case "about":
      case "clear conversation":
      case "conversation":
        return "xl";

      default:
        return "sm";
    }
  };

  const fullscreen = modalType === "about" ? true : undefined;

  const modalTitle = () => {
    switch (modalType) {
      case "about":
        return "about";

      case "clear conversation":
      case "conversation":
        return "clear conversation";

      default:
        return "about"; // You can choose a default value here based on your needs
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={true}
      fullscreen={fullscreen}
      size={modalSize()}
      centered
    >
      <Loader auth>
        <Modal.Header closeButton closeLabel='close'>
          <Modal.Title className='text-capitalize'>{modalTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppModalBody />
        </Modal.Body>
      </Loader>
    </Modal>
  );
};

export default AppModal;
