import { useState } from "react";
import { resetChatHistory } from "../../redux/features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { Alert, Button } from "react-bootstrap";
import { resetUserHistory } from "../../api/firestoreFetches";

const UserUI = () => {
  const dispatch = useAppDispatch();
  const { totalCredit, user } = useAppSelector((state) => ({
    totalCredit: state.chat.totalCredit,
    user: state.authUser.user,
  }));

  const [progress, setProgress] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { userId, email } = user;

  const handleResetHistory = () => {
    setProgress(() => true);
    setShowAlert(() => true);

    setTimeout(async () => {
      localStorage.removeItem("chat");
      dispatch(resetChatHistory());
      await resetUserHistory();
      setShowAlert(() => false);
      setProgress(() => false);
    }, 500);
  };

  const handleOpenAlert = () => setShowAlert(() => true);
  const handleCloseAlert = () => setShowAlert(() => false);

  return (
    <>
      <div>Hello: {email}</div>
      <div>total credit: {totalCredit}</div>

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
