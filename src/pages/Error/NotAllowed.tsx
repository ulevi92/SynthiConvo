import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./timer.scss";
import { fetchSignOut } from "../../redux/features/userData/userDataSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { ErroPagesProps } from "./ErrorPage";

const NotAllowed: FC<ErroPagesProps> = ({ countdown }) => {
  const dispatch = useAppDispatch();

  return (
    <Container fluid className='vh-100 vw-100 bg-secondary text-light'>
      <Row className='h-100'>
        <Col sm={12} className='d-flex flex-column'>
          <div className='my-5'>
            <h1 className='text-danger text-center mb-5'>Access Denied</h1>

            <div className='p-5'>
              <h3 className='text-center text-warning'>
                We have detected that you are using a VPN or Proxy
              </h3>

              <p>
                Due to security reasons, the use of VPNs or proxies is not
                allowed on this platform. To regain access to the application,
                please turn off your VPN or proxy service and try again.
              </p>

              <p className='text-warning'>
                You will be automatically signed out in {countdown} seconds.
              </p>
            </div>
          </div>

          <div className='timer align-self-center mt-5' />
        </Col>
      </Row>
    </Container>
  );
};

export default NotAllowed;
