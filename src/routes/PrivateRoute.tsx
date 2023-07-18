import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useLayoutEffect } from "react";
import { clearAuthErrors } from "../redux/features/auth/authSlice";
import { clearModal } from "../redux/features/global/globalSlice";

const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    isAuth && dispatch(clearModal());
  }, [isAuth]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
