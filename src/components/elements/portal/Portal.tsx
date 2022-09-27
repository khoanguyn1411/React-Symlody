import ReactDOM from "react-dom";

import { GlobalTypes } from "@/utils";

export const Portal: GlobalTypes.FCChildren = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("portal-root")
  );
};
