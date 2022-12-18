import { AppReact } from "@/utils/types";

import { MediaContextProvider } from "./MediaContextProvider";
import { RouterProvider } from "./RouterProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AppTourProvider } from "./TourProvider";

export const AppProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <AppTourProvider>
      <ThemeProvider>
        <MediaContextProvider>
          <RouterProvider>{children}</RouterProvider>
        </MediaContextProvider>
      </ThemeProvider>
    </AppTourProvider>
  );
};
