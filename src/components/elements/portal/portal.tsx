import { memo } from "react";
import ReactDOM from "react-dom";

import { GlobalTypes } from "@/utils";

const _Portal: GlobalTypes.FCChildren = ({ children }) => {
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById("portal-root")
  );
};

export const Portal = memo(_Portal);
