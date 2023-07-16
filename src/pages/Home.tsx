import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../redux/reduxHooks";
import { fetchSignOut } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader/Loader";

const Home = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button onClick={() => dispatch(fetchSignOut())}>sign out</Button>
    </>
  );
};

export default Home;
