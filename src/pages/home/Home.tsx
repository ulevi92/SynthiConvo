import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/auth/authSlice";
import NotVerifiedError from "./NotVerifiedError";
import ChatWindow from "../../components/chat/ChatWindow";

const Home = () => {
  const dispatch = useAppDispatch();
  const notVerified = useAppSelector((state) => state.auth.userEmailVerified);

  if (!notVerified) return <NotVerifiedError />;

  return <ChatWindow />;
};

export default Home;
