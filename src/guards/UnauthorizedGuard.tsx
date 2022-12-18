import { Navigate } from "react-router-dom";

import { APP_DEFAULT_PAGE } from "@/routes";
import { AppReact } from "@/utils/types";

type TProps = {
  isAuth: boolean;
};

export const UnauthorizedGuard: AppReact.FC.PropsWithChildren<TProps> = ({
  children,
  isAuth,
}) => {
  if (!isAuth) {
    return <>{children}</>;
  }
  return <Navigate to={APP_DEFAULT_PAGE} replace />;
};
