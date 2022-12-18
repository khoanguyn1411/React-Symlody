import "./styles/index.css";
import "./styles/tailwind.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/FontAwesomePro/css/fontawesome.min.css";
import "./assets/FontAwesomePro/css/solid.min.css";
import "./assets/FontAwesomePro/css/regular.min.css";
import "react-image-crop/dist/ReactCrop.css";

// import "rc-drawer/assets/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

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
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals( ))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
