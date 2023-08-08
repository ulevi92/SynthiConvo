import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/authUser/authUserSlice";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";

const Home = () => {
  const dispatch = useAppDispatch();
  const notVerified = useAppSelector(
    (state) => state.authUser.user.emailVerified
  );

  if (!notVerified) return <NotVerifiedError />;

  return <ChatWindow />;
};

export default Home;
