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

const key = import.meta.env.VITE_IPREGISTRY_API_KEY;

const getIpRegistry = (): Promise<IpRegistry> =>
  fetch(`https://api.ipregistry.co/?key=${key}`).then((res) => res.json());

function App() {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["getIpRegistry"],
    getIpRegistry
  );

  if (data) {
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
