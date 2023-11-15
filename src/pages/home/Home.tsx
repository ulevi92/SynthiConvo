import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/authUser/authUserSlice";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";
import { useEffect, useRef } from "react";
import {
  addOldCreditRecord,
  addOldHistory,
} from "../../redux/features/chat/chatSlice";
import { ChatMessage } from "../../types/openAI";

const Home = () => {
  const didMount = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const { notVerified, history } = useAppSelector((state) => ({
    notVerified: state.authUser.user.emailVerified,
    history: state.chat.history,
    totalCredit: state.chat.totalCredit,
  }));

  useEffect(() => {
    if (!didMount.current) {
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
      didMount.current = true;
    }
  }, []);

  if (!notVerified) return <NotVerifiedError />;

  return <ChatWindow />;
};

export default Home;
