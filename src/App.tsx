import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import PublicPage from "./pages/PublicPage";
import AppNavbar from "./components/layouts/navbar/AppNavbar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const key = import.meta.env.VITE_IPREGISTRY_API_KEY;

interface GetIpRegistry {
  ip: string;
  security: {
    is_vpm: boolean;
    is_anonymous: boolean;
    is_proxy: boolean;
    is_relay: boolean;
    is_cloud_provider: boolean;
    is_tor: boolean;
    is_tor_exit: boolean;
  };

  location: {
    country: {
      code: string;
      name: string;
    };
  };

  user_agent: {
    header: string;
    name: string;
  };
}

const getIpRegistry = (): Promise<GetIpRegistry> =>
  fetch(`https://api.ipregistry.co/?key=${key}`).then((res) => res.json());

function App() {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["getIpRegistry"],
    getIpRegistry
  );

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
