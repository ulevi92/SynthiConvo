import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/reduxHooks";

const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
