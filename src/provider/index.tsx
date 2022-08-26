import { ThemeProvider as Theme } from "@emotion/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Spin } from "@/assets/icons";
import { DatePortal } from "@/components";

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

export interface TTheme extends Theme {
  colors: any;
}

const theme: Partial<Theme> | ((outerTheme: Theme) => Theme) = {
  colors: {
    primary: "#007ea4",
  },
};

export const ThemeProvider = ({ children }) => {
  return (
    <Theme theme={theme}>
      <DatePortal />
      {children}
    </Theme>
  );
};
