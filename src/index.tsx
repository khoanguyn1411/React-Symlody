import "./index.css";
import "./tailwind.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/FontAwesomePro/css/fontawesome.min.css";
import "./assets/FontAwesomePro/css/solid.min.css";
import "./assets/FontAwesomePro/css/regular.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "@/features";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />

      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={2000}
        pauseOnHover
      />
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals( ))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
