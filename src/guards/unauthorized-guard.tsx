import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks";
import { GlobalTypes } from "@/types";

export const UnauthorizedGuard: GlobalTypes.FCChildren = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <>{children}</>;
  }
  return <Navigate to={"/"} replace />;
};
