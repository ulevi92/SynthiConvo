import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import PublicPage from "./pages/PublicPage";
import AppNavbar from "./components/layouts/navbar/AppNavbar";

function App() {
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
