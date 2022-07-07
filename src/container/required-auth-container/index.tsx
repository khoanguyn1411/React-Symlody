import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProps = {
  children: ReactNode;
  isAuth: boolean;
};

export const RequiredAuth: React.FC<TProps> = ({ children, isAuth }) => {
  const location = useLocation();

  return !isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
