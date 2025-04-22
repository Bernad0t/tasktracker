import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import core from "./core/core";
import { EnterForm } from "./components/pages/Authorization/enter/enter";
import Registration from "./components/pages/Authorization/registration/registration";
import Home from "./components/pages/Home/Home";

export function checkAuthToken(){
  return !!localStorage.getItem(core.localStorageKeys.access_token)
}

const ProtectedRoute: React.FC = () => {
  if (!checkAuthToken()) {
    return <Navigate to={core.frontendEndpoints.login} />;
  }

  return <Outlet />;
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={core.frontendEndpoints.login} element={<EnterForm />} />
        <Route path={core.frontendEndpoints.register} element={<Registration />} />
        <Route path={core.frontendEndpoints.home} element={<ProtectedRoute />}> {/* прод */}
          {/* Ваши защищенные маршруты */}
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;