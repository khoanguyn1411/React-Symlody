import "animate.css";

import React from "react";
import { Route } from "react-router-dom";

import { Icon } from "./assets/icons";
import { images } from "./assets/images";
import { MainLayout } from "./components";
import { AuthorizedGuard, UnauthorizedGuard } from "./guards";
import { useAuth } from "./hooks";
import { AppProvider } from "./provider";
import { routesConfigs } from "./routes";

export const App: React.FC = () => {
  const { isLoading, isAuth } = useAuth();
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-5">
        <img src={images.Logo} width={40} height={40} alt="Symlody logo" />
        <Icon.LogoName />
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
