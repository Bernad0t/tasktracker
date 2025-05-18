import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import core from './core/core';
import { EnterForm } from './components/pages/Authorization/enter/enter';
import Registration from './components/pages/Authorization/registration/registration';
import Home from './components/pages/Home/Home';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useStore';
import { UserSliceManager } from './entities/store/featuries/userSlice';
import { ProjectSliceManager } from './entities/store/featuries/projectSlice';

export function checkAuthToken() {
    return !!localStorage.getItem(core.localStorageKeys.access_token);
}

const ProtectedRoute: React.FC = () => {
    if (!checkAuthToken()) {
        return <Navigate to={core.frontendEndpoints.login} />;
    }

    return <Outlet />;
};

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(UserSliceManager.fetching.getData()); // при внесении изменений надо useAuthSubmit рефакторить
        dispatch(ProjectSliceManager.fetching.getData());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={core.frontendEndpoints.login} element={<EnterForm />} />
                <Route path={core.frontendEndpoints.register} element={<Registration />} />
                <Route path={core.frontendEndpoints.home} element={<ProtectedRoute />}>
                    {' '}
                    {/* прод */}
                    {/* Ваши защищенные маршруты */}
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
