import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useLayoutEffect, useRef } from "react";
import { clearModal } from "../redux/features/global/globalSlice";

const PrivateRoute = () => {
  const isAuth = useAppSelector(({ userData }) => userData.auth.isAuth);
  const showModal = useAppSelector(({ global }) => global.showModal);
  const modalType = useAppSelector(({ global }) => global.modalType);

  const dispatch = useAppDispatch();

  const didMounted = useRef<boolean>(false);

  useLayoutEffect(() => {
    const postToFireStore = async () => {};

    if (
      modalType === "login" ||
      modalType === "sign up" ||
      (modalType === "passwordReminder" &&
        showModal &&
        isAuth &&
        !didMounted.current)
    ) {
      dispatch(clearModal());
      didMounted.current = true;
    }
  }, [isAuth, showModal, modalType]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
