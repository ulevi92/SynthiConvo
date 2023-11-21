import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  addOldCreditRecord,
  addOldHistory,
} from "../../redux/features/chat/chatSlice";

import { setLoading } from "../../redux/features/global/globalSlice";
import {
  getUserCreditAndHistory,
  postUserCreditAndHistory,
} from "../../api/firestoreFetches";
import SideNavbar from "../../components/layouts/side navbar/SideNavbar";
import { Col, Container, Row } from "react-bootstrap";

export const Home = () => {
  const didMount = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    notVerified,
    history,
    totalCredit: credit,
  } = useAppSelector((state) => ({
    notVerified: state.authUser.user.emailVerified,
    history: state.chat.history,
    totalCredit: state.chat.totalCredit,
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

  // return <ChatWindow />;
  return (
    <>
      <Container fluid className='h-100'>
        <Row className='h-100'>
          <Col md={4} lg={2} className='d-none d-md-block'>
            <SideNavbar />
          </Col>

          <Col sm={12} md={8} lg={10}>
            <ChatWindow />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
