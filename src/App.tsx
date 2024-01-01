import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/Error/ErrorPage";

import PublicPage from "./pages/PublicPage/PublicPage";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";

import { auth } from "./firebase/firebase";

import { Loader } from "./components/loader/Loader";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { setLoading } from "./redux/features/global/globalSlice";
import {
  setAuth,
  setUserAllowed,
} from "./redux/features/userData/userDataSlice";

function App() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const userNotAllowed = useAppSelector(
    (state) => state.userData.userNotAllowed
  );
  const isInitialAuthStateChange = useRef(true);

  const domRef = document.getElementById("html-theme")!;

  useLayoutEffect(() => {
    const localStorageDarkModeKey = localStorage.getItem("dark-mode");
    const darkModeStorageValue = darkMode ? "dark" : "light";

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

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("not-allowed")!) && !userNotAllowed) {
      dispatch(
        setUserAllowed(JSON.parse(localStorage.getItem("not-allowed")!))
      );
    }

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
  }, []);

  return (
    <Loader>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>

        <Route path='/login' element={<PublicRoute />}>
          <Route index element={<PublicPage />} />
        </Route>

        <Route path='/*' element={<ErrorPage notFound={true} />} />
      </Routes>
    </Loader>
  );
}

export default App;
