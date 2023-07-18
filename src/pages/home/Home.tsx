import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/auth/authSlice";
import NotVerifiedError from "./NotVerifiedError";

const Home = () => {
  const dispatch = useAppDispatch();
  const notVerified = useAppSelector((state) => state.auth.userEmailVerified);

  if (!notVerified) return <NotVerifiedError />;

  return <>home</>;
};

export default Home;
