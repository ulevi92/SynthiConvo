import { FC, PropsWithChildren, useMemo } from "react";
import "./loader.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/reduxHooks";

interface Props extends PropsWithChildren {
  auth?: boolean;
  chat?: boolean;
}

export const Loader: FC<Props> = ({ children, auth, chat }) => {
  const loading = useAppSelector((state) => state.global.loading);
  const authLoader = useAppSelector((state) => state.userData.auth.authLoading);
  const questionAsked = useAppSelector(
    (state) => state.userData.chat.questionAsked
  );

  if (loading)
    return (
      <Container fluid className='loader-container z-3'>
        <Row className='align-items-center h-100'>
          <Col className='d-flex justify-content-center'>
            <div className='dot dot-loader' />
            <div className='dot dot-loader' />
            <div className='dot dot-loader' />
          </Col>
        </Row>
      </Container>
    );

  if (auth && authLoader)
    return (
      <div className='modal-loader'>
        <div className={`bg-light opacity-25`}>{children}</div>
        <div className='loader'>
          <div className='dot dot-loader' />
          <div className='dot dot-loader' />
          <div className='dot dot-loader' />
        </div>
      </div>
    );

  if (chat && questionAsked) return <div className='loader-circle' />;

  return <>{children}</>;
};
