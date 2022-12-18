import "animate.css";

import React from "react";
import { Route } from "react-router-dom";

import { Icon } from "./assets/icons";
import { MainLayout } from "./components";
import { AuthorizedGuard, UnauthorizedGuard } from "./guards";
import { useAuth } from "./hooks";
import { AppProvider } from "./provider";
import { routesConfigs } from "./routes";

export const App: React.FC = () => {
  const { isLoading, isAuth } = useAuth();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Icon.Spin size="medium" />
      </div>
    );
  }

  return (
    <AppProvider>
      {routesConfigs.privateRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            key={route.pageKey}
            element={
              <AuthorizedGuard isAuth={isAuth}>
                <MainLayout pageKey={route.pageKey}>
                  {route.component}
                </MainLayout>
              </AuthorizedGuard>
            }
          />
        );
      })}

      {routesConfigs.publicRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            key={route.pageKey}
            element={
              <UnauthorizedGuard isAuth={isAuth}>
                {route.component}
              </UnauthorizedGuard>
            }
          />
        );
      })}
    </AppProvider>
  );
};

export default App;
