import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useLayoutEffect, useRef } from "react";
import { closeModal } from "../redux/features/global/globalSlice";

const PrivateRoute = () => {
  const isAuth = useAppSelector(({ userData }) => userData.auth.isAuth);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
