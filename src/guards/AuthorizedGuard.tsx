import { Navigate, useLocation } from "react-router-dom";

import { GlobalTypes } from "@/utils";

type TProps = {
  isAuth: boolean;
};

export const AuthorizedGuard: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  isAuth,
}) => {
  const location = useLocation();
  console.log(location.pathname);
  if (isAuth) {
    return location.pathname === "/" ? (
      <Navigate to="/todo" replace state={{ path: location.pathname }} />
    ) : (
      <>{children}</>
    );
  }
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
};
