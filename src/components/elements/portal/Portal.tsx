import ReactDOM from "react-dom";

import { AppReact } from "@/utils/types";

export const Portal: AppReact.FC.Children = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("portal-root")
  );
};
