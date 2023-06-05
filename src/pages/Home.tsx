import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../store/reduxHooks";
import { fetchSignOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

const Home = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button onClick={() => dispatch(fetchSignOut())}>sign out</Button>
    </>
  );
};

export default Home;
