import React from 'react';

import { Navigate, Outlet, useLocation} from "react-router-dom";

const ProtectedRoutes = () => {
	const localStorageToken = localStorage.getItem("token");
	const location = useLocation();
	return localStorageToken ? <Outlet /> : <Navigate to="/login"  replace state={{ from: location }} />;
};

export default ProtectedRoutes;