import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { APP_CONSTANTS } from "@/constants";

type TProps = {
  children: ReactNode;
};

export const RequiredAuth: React.FC<TProps> = ({ children }) => {
  const isAuth = localStorage.getItem(APP_CONSTANTS.AUTH);
  const location = useLocation();
  return isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
