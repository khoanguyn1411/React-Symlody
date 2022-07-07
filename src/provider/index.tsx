import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Spin } from "@/assets/icons";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <Router>{children}</Router>
    </React.Suspense>
  );
};
