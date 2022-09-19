import "animate.css";

import { Navigate, Route } from "react-router-dom";

import { Icon } from "./assets/icons";
import { MainLayout } from "./components";
import { MediaContextProvider } from "./components/media";
import { useAuth } from "./hooks";
import { AppProvider, ThemeProvider } from "./provider";
import { CustomRoute, routesConfigs } from "./routes";

function App() {
  const { isAuth, isLoading } = useAuth();
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
                    isAuth ? (
                      <MainLayout pageKey={route.pageKey}>
                        {route.component}
                      </MainLayout>
                    ) : (
                      <Navigate
                        to="/login"
                        replace
                        state={{ path: location.pathname }}
                      />
                    )
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
                    !isAuth ? (
                      <>{route.component}</>
                    ) : (
                      <Navigate
                        to="/"
                        replace
                        state={{ path: location.pathname }}
                      />
                    )
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
