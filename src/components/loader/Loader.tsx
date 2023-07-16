import { PropsWithChildren } from "react";
import "./loader.scss";
import { Col, Container, Row } from "react-bootstrap";

export const Loader = ({ children }: PropsWithChildren) => {
  return (
    <Container fluid className='h-100'>
      <Row className='align-items-center h-100 z-3'>
        <Col className='d-flex justify-content-center'>
          <div className='dot dot-1'></div>
          <div className='dot dot-2'></div>
          <div className='dot dot-3'></div>
          <>{children}</>
        </Col>
      </Row>
    </Container>
  );
};
