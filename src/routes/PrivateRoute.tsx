import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useEffect, useLayoutEffect, useRef } from "react";
import { clearModal, setLoading } from "../redux/features/global/globalSlice";
import { setUserError, setUserIp } from "../redux/features/user/userSlice";
import { GetIpRegistry } from "../types/ipregistry";
import { getClientIp } from "../api/fetchIpRegistry";
import { useQuery } from "@tanstack/react-query";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const PrivateRoute = () => {
  const {
    userAccountInfo,
    userIpInfo,
    isAuth,
    showModal,
    clientIp,
    userError,
  } = useAppSelector((state) => ({
    userAccountInfo: state.auth,
    userIpInfo: state.user,
    isAuth: state.auth.isAuth,
    showModal: state.global.showModal,
    clientIp: state.user.ipInfo.ip,
    userError: state.user.isError,
  }));

  if (userError) return <>error page</>;

  const dispatch = useAppDispatch();

  const didMounted = useRef<boolean>(false);
  const didRegisteredIp = useRef<boolean>(false);
  const didConnectedFirebase = useRef<boolean>(false);

  const { data, isError, isSuccess } = useQuery({
    queryFn: getClientIp,
    queryKey: ["clientIp"],
    enabled:
      !localStorage.getItem("userIp") ||
      (!localStorage.getItem("userIp") && !clientIp),
  });

  useLayoutEffect(() => {
    if (isError) {
      dispatch(setUserError(true));
      return;
    }

    if (localStorage.getItem("userIp") && !didRegisteredIp.current) {
      dispatch(setUserIp(JSON.parse(localStorage.getItem("userIp")!)));
      didRegisteredIp.current = true;
    }

    if (isSuccess && !didRegisteredIp.current) {
      localStorage.setItem(
        "userIp",
        JSON.stringify({
          ip: data.ip,
          type: data.type,
          security: data.security,
        })
      );

      dispatch(setUserIp(data));
      didRegisteredIp.current = true;
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
