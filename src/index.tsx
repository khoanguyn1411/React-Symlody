import "./styles/index.css";
import "./styles/tailwind.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/FontAwesomePro/css/fontawesome.min.css";
import "./assets/FontAwesomePro/css/solid.min.css";
import "./assets/FontAwesomePro/css/regular.min.css";
import "react-image-crop/dist/ReactCrop.css";

import { TourProvider } from "@reactour/tour";
// import "rc-drawer/assets/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import {
  customTourClickMask,
  customTourNextButton,
  customTourPrevButton,
} from "@/components";
import { store } from "@/features";

import App from "./App";
import { tourProviderStyles } from "./components";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.Fragment>
    <Provider store={store}>
      <TourProvider
        steps={[]}
        maskClassName="Symlody-tour rt-mask"
        className="Symlody-tour rt-popover"
        highlightedMaskClassName="Symlody-tour rt-highlighted-mask"
        position="left"
        padding={{ mask: 0 }}
        styles={tourProviderStyles}
        showCloseButton={false}
        disableInteraction
        disableDotsNavigation
        disableKeyboardNavigation
        onClickMask={customTourClickMask}
        prevButton={customTourPrevButton}
        nextButton={customTourNextButton}
      >
        <App />
      </TourProvider>

      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={1800}
        pauseOnHover
      />
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals( ))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
