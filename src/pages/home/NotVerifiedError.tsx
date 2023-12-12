import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Timer from "./Timer";
import {
  clearAuthErrors,
  fetchEmailVerification,
} from "../../redux/features/user/userDataSlice";

const NotVerifiedError = () => {
  const dispatch = useAppDispatch();

  const { email, darkMode, requestStatus } = useAppSelector((state) => ({
    email: state.userData.userProfile.email,
    darkMode: state.global.darkMode,
    requestStatus: state.userData.errorFrom,
  }));

  const startTimer = useRef<boolean>(false);

  const [timer, setTimer] = useState<number>(30);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const defaultCardTextStyle = "text-capitalize";

  const defaultWarningText = "fw-bold";

  const defaultSpanStyle = `text-lowercase ms-1 text-decoration-underline text-primary`;

  useEffect(() => {
    if (requestStatus === "auth") {
      setTimer((prevTimer) => 60);
    }
  }, [requestStatus]);

  useEffect(() => {
    if (!emailSent) {
      if (localStorage.getItem("verification") === "true") {
        setEmailSent(true);
        startTimer.current = true;
      }
    }
  }, [emailSent]);

  useEffect(() => {
    const effectTimer = setInterval(() => {
      if (timer > 0 && emailSent && startTimer.current)
        setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0 && emailSent) {
      setTimer(30);
      localStorage.setItem("verification", "false");
      setEmailSent(false);
      startTimer.current = false;
      dispatch(clearAuthErrors());
    }

    return () => clearInterval(effectTimer);
  }, [timer, emailSent]);

  const onClick = () => {
    localStorage.setItem("verification", "true");

    dispatch(fetchEmailVerification());
    setEmailSent(true);
    startTimer.current = true;
  };

  return (
    <Container fluid className='h-100'>
      <Row className='h-100 align-content-center'>
        <Col className='d-flex justify-content-center'>
          <Card>
            <Card.Body className='d-flex flex-column'>
              <Card.Title
                className={`${defaultCardTextStyle} ${defaultWarningText} text-danger text-center`}
              >
                your email isn't verified!
              </Card.Title>

              <Card.Text className={defaultCardTextStyle}>
                you must verify your email to use this app
              </Card.Text>

              <Card.Text className={defaultCardTextStyle}>
                if you haven't received a verification email you can send it
                again - a verification email will be sent to -
                <span className={defaultSpanStyle}>{email}</span>
              </Card.Text>

              <Card.Text
                className={`${defaultCardTextStyle} ${defaultWarningText} ${
                  !darkMode ? "text-primary" : "text-warning"
                }`}
              >
                Beware, any unverified account will be deleted 14 days after its
                creation
              </Card.Text>

              <Timer emailSent={emailSent} onClick={onClick} timer={timer} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotVerifiedError;
