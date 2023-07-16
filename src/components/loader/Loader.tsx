import { PropsWithChildren, useMemo } from "react";
import "./loader.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";

export const Loader = ({ children }: PropsWithChildren) => {
  const loading = useAppSelector((state) => state.global.loading);

  const content = useMemo(() => {
    if (loading)
      return (
        <Container fluid className='h-100 opacity'>
          <Row className='align-items-center h-100 z-3'>
            <Col className='d-flex justify-content-center'>
              <div className='dot dot-1'></div>
              <div className='dot dot-2'></div>
              <div className='dot dot-3'></div>
            </Col>
          </Row>
        </Container>
      );

    return <>{children}</>;
  }, [loading]);

  return content;
};
