import "animate.css";

import React from "react";

import { Icon } from "./assets/icons";
import { images } from "./assets/images";
import { useAuth } from "./hooks";
import { AppProvider } from "./provider";
import { RootRoutes } from "./routes/RootRoutes";

export const App: React.FC = () => {
  const { isLoading } = useAuth();

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
      <RootRoutes />
    </AppProvider>
  );
};

export default App;
