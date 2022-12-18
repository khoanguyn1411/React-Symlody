import { AppReact } from "@/utils/types";

import { MediaContextProvider } from "./MediaContextProvider";
import { RouterProvider } from "./RouterProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import { AppTourProvider } from "./TourProvider";

export const AppProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <AppTourProvider>
      <ToastProvider>
        <ThemeProvider>
          <MediaContextProvider>
            <RouterProvider>{children}</RouterProvider>
          </MediaContextProvider>
        </ThemeProvider>
      </ToastProvider>
    </AppTourProvider>
  );
};
