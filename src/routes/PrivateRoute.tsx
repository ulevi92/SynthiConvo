import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useEffect, useRef } from "react";
import { clearModal } from "../redux/features/global/globalSlice";

const PrivateRoute = () => {
  const { isAuth, showModal } = useAppSelector((state) => ({
    isAuth: state.authUser.auth.isAuth,
    showModal: state.global.showModal,
  }));

  const dispatch = useAppDispatch();

  const didMounted = useRef<boolean>(false);

  // const { data, isError, isSuccess } = useQuery({
  //   queryFn: getClientIp,
  //   queryKey: ["clientIp"],
  //   enabled:
  //     !localStorage.getItem("userIp") ||
  //     (!localStorage.getItem("userIp") && !clientIp),
  // });

  useEffect(() => {
    if (showModal && isAuth && !didMounted.current) {
      dispatch(clearModal());
      didMounted.current = true;
    }
  }, [isAuth, showModal]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
