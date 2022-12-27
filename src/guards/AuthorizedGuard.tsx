import { Navigate, useLocation } from "react-router-dom";

import { APP_DEFAULT_PAGE, routePaths } from "@/routes";
import { AppReact } from "@/utils/types";

type TProps = {
  isAuth: boolean;
};

export const AuthorizedGuard: AppReact.FC.PropsWithChildren<TProps> = ({
  children,
  isAuth,
}) => {
  const location = useLocation();
  if (isAuth) {
    if (location.pathname === routePaths.root.url) {
      return <Navigate to={APP_DEFAULT_PAGE} replace />;
    }
    return <>{children}</>;
  }
  return <Navigate to={routePaths.login.url} replace />;
};
