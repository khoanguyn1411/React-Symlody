import "./App.css";
import "animate.css";

import { Navigate, Route } from "react-router-dom";

import { Spin } from "./assets/icons";
import { MainLayout } from "./components";
import { useAuth } from "./hooks";
import { AppProvider } from "./provider";
import { CustomRoute, routesConfigs } from "./routes";

function App() {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AppProvider>
      <CustomRoute>
        {routesConfigs.privateRoutes.map((route, index) => {
          return (
            <Route
              path={route.path}
              key={`publicRoute_${index}`}
              element={
                !isAuth ? (
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
                isAuth ? (
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
    </AppProvider>
  );

  // return (
  //   <div>
  //     <BrowserRouter>
  //       <CustomRoute>
  //         {routesConfigs.privateRoutes.map((route, index) => {
  //           const Component = route.component;
  //           // const Layout: any =
  //           //   route.layout !== null ? route.layout || MainLayout : Fragment;

  //           return (
  //             <Route
  //               path={route.path}
  //               key={`privateRoute_${index}`}
  //               element={
  //                 // <RequiredAuth isAuth={isAuth}>
  //                 <MainLayout
  //                   pageKey={route.pageKey}
  //                   pageTitle={route.pageTitle}
  //                 >
  //                   {isAuth ? (
  //                     <Component />
  //                   ) : (
  //                     <Navigate
  //                       to="/"
  //                       replace
  //                       state={{ path: location.pathname }}
  //                     />
  //                   )}
  //                 </MainLayout>
  //                 // </RequiredAuth>
  //               }
  //             />
  //           );
  //         })}

  //         {routesConfigs.publicRoutes.map((route, index) => {
  //           const Component = route.component;
  //           // const Layout: any =
  //           //   route.layout !== null ? route.layout || MainLayout : Fragment;

  //           return (
  //             <Route
  //               path={route.path}
  //               key={`publicRoute_${index}`}
  //               element={
  //                 // <Layout>
  //                 //   <Component />
  //                 // </Layout>

  //                 !isAuth ? (
  //                   <Component />
  //                 ) : (
  //                   <Navigate
  //                     to="/"
  //                     replace
  //                     state={{ path: location.pathname }}
  //                   />
  //                 )
  //               }
  //             />
  //           );
  //         })}
  //       </CustomRoute>
  //     </BrowserRouter>
  //   </div>
  // );
}

export default App;
