import { ThemeProvider as Theme } from "@emotion/react";

import { AppReact } from "@/utils/types";

const theme: Partial<Theme> | ((outerTheme: Theme) => Theme) = {
  colors: {
    primary: "#007ea4",
  },
};

export const ThemeProvider: AppReact.FC.Children = ({ children }) => {
  return <Theme theme={theme}>{children}</Theme>;
};
