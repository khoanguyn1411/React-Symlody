import { Navigate } from "react-router-dom";

import { GlobalTypes } from "@/types";

type TProps = {
  isAuth: boolean;
};

export const UnauthorizedGuard: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  isAuth,
}) => {
  if (!isAuth) {
    return <>{children}</>;
  }
  return <Navigate to={"/"} replace />;
};
