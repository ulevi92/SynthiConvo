import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../redux/reduxHooks";
import { fetchSignOut } from "../../redux/features/auth/authSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  return <>home</>;
};

export default Home;
