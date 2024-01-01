import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";
import { useLayoutEffect, useRef } from "react";

import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import AppModal from "../../components/modal/AppModal";
import { StoredChatData } from "../../types/userData";
import { updateChatData } from "../../redux/features/userData/userDataSlice";
import MobileMenu from "../../components/sidebar/MobileMenu";
import ErrorPage from "../Error/ErrorPage";

export const Home = () => {
  const didMount = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  const notVerified = useAppSelector(
    ({ userData }) => userData.userProfile.emailVerified
  );
  const history = useAppSelector(({ userData }) => userData.chat.history);
  const credit = useAppSelector(({ userData }) => userData.chat.credit);

  const userNotAllowed = useAppSelector(
    ({ userData }) => userData.userNotAllowed
  );

  const darkMode = useAppSelector(({ global }) => global.darkMode);

  useLayoutEffect(() => {
    if (!didMount.current) {
      const chatDataRef = localStorage.getItem("chat");

      if (chatDataRef) {
        const storedChatData: StoredChatData = JSON.parse(chatDataRef);
        dispatch(updateChatData(storedChatData));
      }

      didMount.current = true;
    }
  }, [credit, history]);

  if (userNotAllowed) return <ErrorPage notFound={false} />;

  if (!notVerified) return <NotVerifiedError />;
  // if (userNotAllowed) return <></>;

  const sidebarStyle = `h-100 flex-column d-none d-md-flex p-0 border-end border-opacity-50 ${
    darkMode ? "border-grey" : "border-grey"
  }`;

  return (
    <>
      <Container
        fluid
        className='d-flex flex-column z-2 h-100'
        style={{ transition: "all 350ms ease-in-out" }}
      >
        <Row className='position-relative flex-grow-1'>
          <Col className={sidebarStyle} md={4} lg={3} xxl={2}>
            <Sidebar />
          </Col>

          <Col className='d-block d-md-none p-0 z-3'>
            <MobileMenu />
          </Col>

          <Col
            xs={12}
            md={8}
            lg={9}
            xxl={10}
            className='position-relative d-flex flex-column overflow-hidden mh-100'
          >
            <ChatWindow />
          </Col>
        </Row>
      </Container>
      <AppModal />
    </>
  );
};

export default Home;
