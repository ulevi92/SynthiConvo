import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import {
  cleanGlobalCache,
  setModalType,
  setShowModal,
} from "../../redux/features/global/globalSlice";
import AuthForm from "../form/AuthForm";
import { Provider } from "react-redux";

const AuthModal = () => {
  const showModal = useAppSelector((state) => state.global.showModal);

  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(cleanGlobalCache());
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
        <AuthForm />
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
