import "./App.css";

import { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { RequiredAuth } from "@/container";

import { MainLayout } from "./components";
import { CustomRoute, routesConfigs } from "./routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CustomRoute>
          {routesConfigs.privateRoutes.map((route, index) => {
            const Component = route.component;
            const Layout: any =
              route.layout !== null ? route.layout || MainLayout : Fragment;

            return (
              <Route
                path={route.path}
                key={`privateRoute_${index}`}
                element={
                  <RequiredAuth>
                    <Layout>
                      <Component />
                    </Layout>
                  </RequiredAuth>
                }
              />
            );
          })}

          {routesConfigs.publicRoutes.map((route, index) => {
            const Component = route.component;
            const Layout: any =
              route.layout !== null ? route.layout || MainLayout : Fragment;

            return (
              <Route
                path={route.path}
                key={`publicRoute_${index}`}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          })}
        </CustomRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;
