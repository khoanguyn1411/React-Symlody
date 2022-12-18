import { Navigate, useLocation } from "react-router-dom";

import { APP_DEFAULT_PAGE, EPagePath } from "@/routes";
import { AppReact } from "@/utils/types";

type TProps = {
  isAuth: boolean;
};

export const AuthorizedGuard: AppReact.FC.PropsWithChildren<TProps> = ({
  children,
  isAuth,
}) => {
  const location = useLocation();
  if (isAuth) {
    return location.pathname === EPagePath.Home ? (
      <Navigate
        to={APP_DEFAULT_PAGE}
        replace
        state={{ path: location.pathname }}
      />
    ) : (
      <>{children}</>
    );
  }
  return (
    <Navigate
      to={EPagePath.Login}
      replace
      state={{ path: location.pathname }}
    />
  );
};
