import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/reduxHooks";

const PublicRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return !isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default PublicRoute;
