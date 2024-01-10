import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { Alert, Button } from "react-bootstrap";
import {
  resetChatHistory,
  resetUserHistory,
} from "../../redux/features/userData/userDataSlice";

const UserUI = () => {
  const dispatch = useAppDispatch();

  const credit = useAppSelector((state) => state.userData.chat.credit);
  const user = useAppSelector((state) => state.userData.userProfile);

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { userId, email } = user;

  const handleResetHistory = () => {
    setShowAlert(() => true);

    dispatch(resetUserHistory());

    setTimeout(async () => {
      localStorage.removeItem("chat");
      dispatch(resetChatHistory());
      setShowAlert(() => false);
    }, 500);
  };

  const handleOpenAlert = () => setShowAlert(() => true);
  const handleCloseAlert = () => setShowAlert(() => false);

  return (
    <>
      <div>Hello: {email}</div>
      <div>total credit: {credit}</div>

      <Button onClick={handleOpenAlert}>reset history</Button>

      <Alert
        show={showAlert}
        variant='danger'
        onClose={handleCloseAlert}
        dismissible
      >
        <Alert.Heading>
          Warning! You're about to clear your history
        </Alert.Heading>

        <p>After clearing your history you won't be able to restore it</p>
        <p>Please note: clearing your history won't restore your credit</p>

        <Button variant='outline-danger' onClick={handleResetHistory}>
          clear history
        </Button>
      </Alert>
    </>
  );
};

export default UserUI;
