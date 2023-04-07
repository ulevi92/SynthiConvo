import { Navigate, Outlet } from "react-router-dom";
import store from "../store/store";

const PrivateRoute = () => {
  const auth = store.getState().auth.isAuth;

  return auth ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
