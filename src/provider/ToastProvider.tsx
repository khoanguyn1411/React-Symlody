import { ToastContainer } from "react-toastify";

import { AppReact } from "@/utils/types";

export const ToastProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={1800}
        pauseOnHover
      />
    </>
  );
};
