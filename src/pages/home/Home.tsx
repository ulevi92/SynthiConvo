import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/authUser/authUserSlice";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";
import { useEffect, useRef } from "react";
import { addOldHistory } from "../../redux/features/chat/chatSlice";

const Home = () => {
  const didMount = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const { notVerified, history } = useAppSelector((state) => ({
    notVerified: state.authUser.user.emailVerified,
    history: state.chat.history,
  }));

  useEffect(() => {
    if (!didMount.current) {
      dispatch(addOldHistory(JSON.parse(localStorage.getItem("chat")!)));

      didMount.current = true;
    }
  }, []);

  if (!notVerified) return <NotVerifiedError />;

  return <ChatWindow />;
};

export default Home;
