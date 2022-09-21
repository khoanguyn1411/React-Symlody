import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks";
import { GlobalTypes } from "@/types";

export const AuthorizedGuard: GlobalTypes.FCChildren = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
};
