import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { clearModal } from "../../redux/features/global/globalSlice";
import AuthForm from "../form/AuthForm";
import { clearAuthErrors } from "../../redux/features/authUser/authUserSlice";
import UserModal from "./UserModal";

const AppModal = () => {
  const showModal = useAppSelector((state) => state.global.showModal);

  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearModal());
    dispatch(clearAuthErrors());
  };

  const ModalBody = () => {
    if (
      modalType === "login" ||
      modalType === "sign up" ||
      modalType === "passwordReminder"
    )
      return <AuthForm />;

    return <UserModal />;
  };

  return (
    <Modal
      centered
      show={showModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={true}
    >
      <Modal.Header closeButton closeLabel='close'>
        <Modal.Title className='text-capitalize'>{modalType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalBody />
      </Modal.Body>
    </Modal>
  );
};

export default AppModal;
