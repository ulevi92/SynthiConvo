import { memo, useMemo } from "react";
import { Button, Card } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";

interface Props {
  emailSent: boolean;
  timer: number;
  onClick: () => void;
}

const Timer = ({ emailSent, onClick, timer }: Props) => {
  const error = useAppSelector((state) => state.userData.errorFrom);

  return useMemo(() => {
    if (emailSent) {
      return (
        <>
          <div className='d-flex justify-content-center align-items-center mt-5 mb-2'>
            <div className='rounded-timer'>
              <div className='email-verification-timer'>{timer}</div>
            </div>
          </div>

          {error === "auth" && (
            <Card.Text className='text-capitalize text-danger fw-bolder d-flex align-self-center'>
              to many requests, please try again latter
            </Card.Text>
          )}
        </>
      );
    }

    return (
      <Button
        className='align-self-center text-capitalize'
        variant='outline-primary'
        onClick={onClick}
        disabled={emailSent}
      >
        send me a verification email
      </Button>
    );
  }, [emailSent, timer]);
};

export default memo(Timer);
