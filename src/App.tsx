import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";

import PublicPage from "./pages/PublicPage";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";

import { auth } from "./firebase/firebase";

import { Loader } from "./components/loader/Loader";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { setLoading } from "./redux/features/global/globalSlice";
import { setAuth } from "./redux/features/user/userDataSlice";

function App() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.global.darkMode);
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

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Loader>
  );
}

export default App;
