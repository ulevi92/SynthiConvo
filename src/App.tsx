import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import PublicPage from "./pages/PublicPage";
import AppNavbar from "./components/layouts/navbar/AppNavbar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IpRegistry } from "./features/user/types";
import { useAppDispatch } from "./store/reduxHooks";
import { setUser } from "./features/user/userSlice";
import store from "./store/store";
import { auth } from "./firebase/firebase";
import { authStateChange } from "./features/auth/authSlice";

const key = import.meta.env.VITE_IPREGISTRY_API_KEY;

const getIpRegistry = (): Promise<IpRegistry> =>
  fetch(`https://api.ipregistry.co/?key=${key}`).then((res) => res.json());

function App() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      store.dispatch(authStateChange(user));
    });
  }, [auth]);

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["getIpRegistry"],
    getIpRegistry
  );

  if (data) {
    localStorage.setItem("userIp", JSON.stringify(data.ip));
  }

  const dispatch = useAppDispatch();

  if (isSuccess) {
    dispatch(setUser(data));
  }

  return (
    <Routes>
      <Route path='/home' Component={PrivateRoute}>
        <Route path='/home' Component={Home}></Route>
      </Route>

      <Route path='/' Component={PublicPage} />

      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
