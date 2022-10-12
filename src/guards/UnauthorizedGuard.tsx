import { Navigate } from "react-router-dom";

import { APP_DEFAULT_PAGE } from "@/constants";
import { GlobalTypes } from "@/utils";

type TProps = {
  isAuth: boolean;
};

export const UnauthorizedGuard: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  isAuth,
}) => {
  // const location = useLocation();
  // const stateLocation: TStateLocation = location?.state;
  // const pathLocation = stateLocation?.path;
  // navigate(pathLocation || "/todo");

  if (!isAuth) {
    return <>{children}</>;
  }
  return <Navigate to={APP_DEFAULT_PAGE} replace />;
};
