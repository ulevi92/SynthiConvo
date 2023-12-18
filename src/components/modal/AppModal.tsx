import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { clearModal } from "../../redux/features/global/globalSlice";
import { clearAuthErrors } from "../../redux/features/userData/userDataSlice";
import AppModalBody from "./AppModalBody";
import { Loader } from "../loader/Loader";

const AppModal = () => {
  const showModal = useAppSelector((state) => state.global.showModal);

  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearModal());
    dispatch(clearAuthErrors());
    modalType === "login" ||
      modalType === "sign up" ||
      (modalType === "passwordReminder" && dispatch(clearAuthErrors()));
  };

  const modalSize: () => "sm" | "xl" = () => {
    switch (modalType) {
      case "about":
      case "account":
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

      case "account":
        return "account";

      case "clear conversation":
      case "conversation":
        return "clear conversation";

      case "login":
        return "login";

      case "passwordReminder":
        return "reset your password";

      case "sign up":
        return "sign up";

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
      <Loader>
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
