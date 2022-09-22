import "animate.css";

import { Route } from "react-router-dom";

import { Icon } from "./assets/icons";
import { MainLayout } from "./components";
import { MediaContextProvider } from "./components/media";
import { AuthorizedGuard, UnauthorizedGuard } from "./guards";
import { useAuth } from "./hooks";
import { AppProvider, ThemeProvider } from "./provider";
import { CustomRoute, routesConfigs } from "./routes";

function App() {
  const { isLoading } = useAuth();
  console.log(isLoading, "--isLoading");
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Icon.Spin size="large" />
      </div>
    );
  }

  return (
    <AppProvider>
      <MediaContextProvider>
        <ThemeProvider>
          <CustomRoute>
            {routesConfigs.privateRoutes.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  key={`privateRoute_${index}`}
                  element={
                    <AuthorizedGuard>
                      <MainLayout pageKey={route.pageKey}>
                        {route.component}
                      </MainLayout>
                    </AuthorizedGuard>
                  }
                />
              );
            })}

            {routesConfigs.publicRoutes.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  key={`publicRoute_${index}`}
                  element={
                    <UnauthorizedGuard>
                      <>{route.component}</>
                    </UnauthorizedGuard>
                  }
                />
              );
            })}
          </CustomRoute>
        </ThemeProvider>
      </MediaContextProvider>
    </AppProvider>
  );
}

export default App;
