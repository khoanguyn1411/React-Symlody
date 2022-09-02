import ReactDOM from "react-dom";

import { GlobalTypes } from "@/global";

export const Portal: GlobalTypes.FCChildren = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("portal-root")
  );
};
