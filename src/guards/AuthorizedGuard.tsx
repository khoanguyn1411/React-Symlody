import { Navigate, Outlet, useLocation } from "react-router-dom";

import { APP_DEFAULT_PAGE, routePaths } from "@/routes";

type TProps = {
  isAuth: boolean;
};

// Test
export const AuthorizedGuard: React.FC<TProps> = ({ isAuth }) => {
  const location = useLocation();
  if (isAuth) {
    if (location.pathname === routePaths.root.url) {
      return <Navigate to={APP_DEFAULT_PAGE} replace />;
    }
    return <Outlet />;
  }
  return <Navigate to={routePaths.login.url} replace />;
};
