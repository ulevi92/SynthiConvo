import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useEffect, useRef } from "react";
import { clearModal, setLoading } from "../redux/features/global/globalSlice";
import { setUserIp } from "../redux/features/user/userSlice";
import { GetIpRegistry } from "../types/ipregistry";
import { getClientIp } from "../api/fetchIpRegistry";
import { useQuery } from "@tanstack/react-query";

const PrivateRoute = () => {
  const { isAuth, showModal, clientIp } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
    showModal: state.global.showModal,
    clientIp: state.user.ipInfo.ip,
  }));

  const dispatch = useAppDispatch();
  const didMounted = useRef<boolean>(false);
  const { data, isError, isSuccess } = useQuery({
    queryFn: getClientIp,
    enabled:
      !localStorage.getItem("userIp") ||
      (!localStorage.getItem("userIp") && !clientIp),
  });

  useEffect(() => {
    if (localStorage.getItem("userIp")) {
      dispatch(setUserIp(JSON.parse(localStorage.getItem("userIp")!)));
    }

    if (isError) {
    }

    if (isSuccess) {
      localStorage.setItem(
        "userIp",
        JSON.stringify({
          ip: data.ip,
          type: data.type,
          security: data.security,
        })
      );

      dispatch(setUserIp(data));
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (showModal && isAuth && !didMounted.current) {
      dispatch(clearModal());
      didMounted.current = true;
    }
  }, [isAuth, showModal]);

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
