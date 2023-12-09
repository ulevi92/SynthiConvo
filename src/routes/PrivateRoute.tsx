import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useEffect, useLayoutEffect, useRef } from "react";
import { clearModal } from "../redux/features/global/globalSlice";

const PrivateRoute = () => {
  const { isAuth, showModal, modalType, user } = useAppSelector((state) => ({
    isAuth: state.authUser.auth.isAuth,
    showModal: state.global.showModal,
    modalType: state.global.modalType,
    user: state.authUser.user,
  }));

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
