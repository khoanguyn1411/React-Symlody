import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";

import { RequiredAuth } from "@/container";

import { CustomRoute, routesConfigs } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomRoute>
          {routesConfigs.privateRoutes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                path={route.path}
                key={`privateRoute_${index}`}
                element={
                  <RequiredAuth>
                    <Component />
                  </RequiredAuth>
                }
              />
            );
          })}

          {routesConfigs.publicRoutes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                path={route.path}
                key={`publicRoute_${index}`}
                element={<Component />}
              />
            );
          })}
        </CustomRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;
