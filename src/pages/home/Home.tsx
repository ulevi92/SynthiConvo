import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";
import { useLayoutEffect, useRef } from "react";

import { setLoading } from "../../redux/features/global/globalSlice";

import { Col, Container, Row } from "react-bootstrap";
import Dashboard from "../../components/layouts/sidebar/Dashboard";
import AppModal from "../../components/modal/AppModal";

export const Home = () => {
  const didMount = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    notVerified,
    history,
    totalCredit: credit,
    darkMode,
  } = useAppSelector((state) => ({
    notVerified: state.user.user.emailVerified,
    history: state.user.chat.history,
    totalCredit: state.user.chat.credit,
    darkMode: state.global.darkMode,
  }));

  if (!notVerified) return <NotVerifiedError />;

  const sidebarStyle = `h-100 flex-column d-none d-md-flex p-0 border-end border-opacity-50 ${
    darkMode ? "border-grey" : "border-grey"
  }`;

  return (
    <>
      <Container
        fluid
        className='d-flex flex-column h-100'
        style={{ transition: "all 2s ease-in-out" }}
      >
        <Row className='h-100'>
          <Col className={sidebarStyle} md={3} lg={2}>
            <Dashboard />
          </Col>

          <Col xs={12} md={9} lg={10}>
            <ChatWindow />
          </Col>
        </Row>
      </Container>
      <AppModal />
    </>
  );
};

export default Home;
