import { Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import { useAppSelector } from "@/features";
import { AppReact } from "@/utils/types";

TopBarProgress.config({
  barColors: {
    "0": "#40BBD8",
    "1.0": "#007EA4",
  },
  shadowBlur: 5,
});

export const CustomRoute: AppReact.FC.Children = ({ children }) => {
  const { isRouteLoading } = useAppSelector((state) => state.common);

  return (
    <>
      {isRouteLoading && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  );
};
