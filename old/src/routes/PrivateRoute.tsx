import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../store/reduxHooks";

const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
