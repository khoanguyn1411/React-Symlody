import { Navigate } from "react-router-dom";

import { APP_DEFAULT_PAGE } from "@/routes";
import { GlobalTypes } from "@/utils";

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
  return <Navigate to={APP_DEFAULT_PAGE} replace />;
};
