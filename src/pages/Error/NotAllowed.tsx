import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./not-allowed.scss";

const NotAllowed = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container fluid className='vh-100 vw-100 bg-secondary text-light'>
      <Row className='h-100'>
        <Col sm={12} className='d-flex flex-column'>
          <div className='my-5'>
            <h1 className='text-danger'>Access Denied</h1>

            <h3>We have detected that you are using a VPN or Proxy</h3>

            <p>
              Due to security reasons, the use of VPNs or proxies is not allowed
              on this platform. To regain access to the application, please turn
              off your VPN or proxy service and try again.
            </p>

            <p>You will be automatically signed out in {countdown} seconds.</p>
          </div>

          <div className='timer align-self-center mt-5' />
        </Col>
      </Row>
    </Container>
  );
};

export default NotAllowed;
