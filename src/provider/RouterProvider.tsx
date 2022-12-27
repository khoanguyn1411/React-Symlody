import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Icon } from "@/assets/icons";
import { CustomRoute } from "@/routes";
import { AppReact } from "@/utils/types";

export const RouterProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Icon.Spin size="small" />
        </div>
      }
    >
      <BrowserRouter>
        <CustomRoute>{children}</CustomRoute>
      </BrowserRouter>
    </React.Suspense>
  );
};
