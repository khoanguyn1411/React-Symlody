import { ReactNode } from "react";
import ReactDOM from "react-dom";

type TProps = {
  children: ReactNode;
};

export const Portal: React.FC<TProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <div>{children}</div>,
    document.getElementById("portal-root")
  );
};
