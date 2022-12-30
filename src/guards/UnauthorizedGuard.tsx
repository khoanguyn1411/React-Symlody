import { Navigate, Outlet } from "react-router-dom";

import { APP_DEFAULT_PAGE } from "@/routes";

type TProps = {
  isAuth: boolean;
};

export const UnauthorizedGuard: React.FC<TProps> = ({ isAuth }) => {
  if (!isAuth) {
    return <Outlet />;
  }
  return <Navigate to={APP_DEFAULT_PAGE} replace />;
};
