import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  addOldCreditRecord,
  addOldHistory,
} from "../../redux/features/chat/chatSlice";

import { setLoading } from "../../redux/features/global/globalSlice";
import {
  getUserCreditAndHistory,
  postUserCreditAndHistory,
} from "../../api/firestoreFetches";

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
    notVerified: state.authUser.user.emailVerified,
    history: state.chat.history,
    totalCredit: state.chat.totalCredit,
    darkMode: state.global.darkMode,
  }));

  useLayoutEffect(() => {
    const postUserData = async () => {
      await postUserCreditAndHistory(history, credit);
    };
    postUserData();
  }, [history, credit]);

  useLayoutEffect(() => {
    const pageStarted = async () => {
      const data = await getUserCreditAndHistory();

      if (data) {
        dispatch(addOldHistory(data.user.chatHistory));
        dispatch(addOldCreditRecord(data.user.credit));
      }

      if (!data) {
        if (localStorage.getItem("chat")) {
          dispatch(addOldHistory(JSON.parse(localStorage.getItem("chat")!)));
        }

        // Check for existing credit records in localStorage
        if (localStorage.getItem("credit")) {
          // Dispatch an action to add old credit records
          dispatch(
            addOldCreditRecord(JSON.parse(localStorage.getItem("credit")!))
          );
        }
      }

      didMount.current = true;
    };

    if (!didMount.current) pageStarted();
  }, []);

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
