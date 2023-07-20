import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useEffect, useRef } from "react";
import { clearModal } from "../redux/features/global/globalSlice";

const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const showModal = useAppSelector((state) => state.global.showModal);
  const dispatch = useAppDispatch();
  const didMounted = useRef<boolean>(false);

  useEffect(() => {
    if (showModal && isAuth && !didMounted.current) {
      dispatch(clearModal());
      didMounted.current = true;
    }
  }, [isAuth, showModal]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
