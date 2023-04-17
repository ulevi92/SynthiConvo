import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { setModalType, setShowModal } from "../../features/global/globalSlice";
import AuthForm from "../form/AuthForm";
import { Provider } from "react-redux";

const AuthModal = () => {
  const showModal = useAppSelector((state) => state.global.showModal);

  const modalType = useAppSelector((state) => state.global.modalType);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setShowModal(false));
    dispatch(setModalType(null));
  };

  const btnName = modalType === "login" ? modalType : modalType;

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton closeLabel='close'>
        <Modal.Title className='text-capitalize'>{modalType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthForm />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant='outline-secondary'
          className='text-uppercase'
          onClick={handleClose}
        >
          close
        </Button>

        <Button className='text-uppercase' variant='success' type='submit'>
          {btnName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
