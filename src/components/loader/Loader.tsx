import { PropsWithChildren, useMemo } from "react";
import "./loader.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";

export const Loader = ({ children }: PropsWithChildren) => {
  const loading = useAppSelector((state) => state.global.loading);
  const authLoader = useAppSelector((state) => state.userData.auth.authLoading);

  if (authLoader)
    return (
      <div className='modal-loader'>
        <div className={`bg-light opacity-25`}>{children}</div>
        <div className='loader'>
          <div className='dot' />
          <div className='dot' />
          <div className='dot' />
        </div>
      </div>
    );

  if (loading)
    return (
      <Container fluid className='loader-container z-3'>
        <Row className='align-items-center h-100'>
          <Col className='d-flex justify-content-center'>
            <div className='dot' />
            <div className='dot' />
            <div className='dot' />
          </Col>
        </Row>
      </Container>
    );

  return <>{children}</>;
};
