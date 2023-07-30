import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";

import PublicPage from "./pages/PublicPage";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { IpRegistry } from "./features/user/types";
import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";

import { auth } from "./firebase/firebase";
import { setAuth } from "./redux/features/auth/authSlice";

import { setDarkMode, setLoading } from "./redux/features/global/globalSlice";
import { Loader } from "./components/loader/Loader";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// const key = import.meta.env.VITE_IPREGISTRY_API_KEY;

// const getIpRegistry = (): Promise<IpRegistry> =>
// fetch(`https://api.ipregistry.co/?key=${key}`).then((res) => res.json());

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const isInitialAuthStateChange = useRef(true);

  const domRef = document.getElementById("html-theme")!;

  useLayoutEffect(() => {
    const localStorageDarkModeKey = localStorage.getItem("dark-mode");
    const darkModeStorageValue = darkMode ? "dark" : "light";

    // if (localStorageDarkModeKey)
    //   dispatch(setDarkMode(localStorageDarkModeKey === "dark" ? true : false));

    if (!localStorageDarkModeKey)
      localStorage.setItem("dark-mode", darkModeStorageValue);

    if (
      localStorageDarkModeKey &&
      localStorageDarkModeKey !== darkModeStorageValue
    )
      localStorage.setItem("dark-mode", darkModeStorageValue);

    if (darkMode) domRef.setAttribute("data-bs-theme", "dark");
    if (!darkMode) domRef.setAttribute("data-bs-theme", "light");
  }, [darkMode]);

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
      if (isAuthenticated && isInitialAuthStateChange.current) {
        isInitialAuthStateChange.current = false;

        dispatch(setAuth(isAuthenticated));
        dispatch(setLoading(false));
      }

      if (isInitialAuthStateChange.current) {
        isInitialAuthStateChange.current = false;
        dispatch(setLoading(false)); // Set loading to false after initial load
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Loader>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>

        <Route path='/login' element={<PublicRoute />}>
          <Route index element={<PublicPage />} />
        </Route>

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Loader>
  );
}

export default App;
