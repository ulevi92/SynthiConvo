import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import PublicPage from "./pages/PublicPage";

import { useEffect, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { IpRegistry } from "./features/user/types";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";

import { auth } from "./firebase/firebase";
import { setAuth } from "./features/auth/authSlice";

import { setLoading } from "./features/global/globalSlice";
import { Loader } from "./components/Loader";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// const key = import.meta.env.VITE_IPREGISTRY_API_KEY;

// const getIpRegistry = (): Promise<IpRegistry> =>
// fetch(`https://api.ipregistry.co/?key=${key}`).then((res) => res.json());

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const loading = useAppSelector((state) => state.global.loading);
  const isInitialLoad = useRef(true); // Track initial load

  // const { data, isLoading, isError, isSuccess } = useQuery(
  //   ["getIpRegistry"],
  //   getIpRegistry
  // );

  // if (data) {
  //   localStorage.setItem("userIp", JSON.stringify(data.ip));
  // }

  // if (isSuccess) {
  //   dispatch(setUser(data));
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const isAuthenticated = user !== null;

      // Update auth state
      if (isAuthenticated !== isAuth) {
        dispatch(setAuth(isAuthenticated));
      }

      // Check if it's the initial load
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        dispatch(setLoading(false)); // Set loading to false after initial load
      }
    });

    return unsubscribe;
  }, []);

  if (loading || isInitialLoad.current) return <Loader />;

  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='/login' element={<PublicRoute />}>
        <Route index element={<PublicPage />} />
      </Route>

      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
