import { PropsWithChildren, useMemo } from "react";
import "./loader.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";

export const Loader = ({ children }: PropsWithChildren) => {
  const loading = useAppSelector((state) => state.global.loading);

  if (!loading) return <>{children}</>;

  return (
    <Container fluid className={`loader-container`}>
      <Row className='align-items-center h-100 z-3'>
        <Col className='d-flex justify-content-center'>
          <div className='dot dot-1'></div>
          <div className='dot dot-2'></div>
          <div className='dot dot-3'></div>
        </Col>
      </Row>
    </Container>
  );
};
