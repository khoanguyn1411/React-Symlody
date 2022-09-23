import { Navigate, useLocation } from "react-router-dom";

import { GlobalTypes } from "@/types";

type TProps = {
  isAuth: boolean;
};

export const AuthorizedGuard: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  isAuth,
}) => {
  const location = useLocation();

  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
};
