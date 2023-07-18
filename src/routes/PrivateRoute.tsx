import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useEffect } from "react";
import { clearModal } from "../redux/features/global/globalSlice";

const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const showModal = useAppSelector((state) => state.global.showModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showModal && isAuth) dispatch(clearModal());
  }, [isAuth, showModal]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
