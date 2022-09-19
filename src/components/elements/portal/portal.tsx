import ReactDOM from "react-dom";

import { GlobalTypes } from "@/types";

export const Portal: GlobalTypes.FCChildren = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("portal-root")
  );
};
