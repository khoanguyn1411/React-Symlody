import { TourProvider } from "@reactour/tour";

import {
  CustomTourNextButton,
  CustomTourPrevButton,
  onClickTourMask,
  tourProviderStyles,
} from "@/components";
import { AppReact } from "@/utils/types";

import style from "./TourProvider.module.css";

export const AppTourProvider: AppReact.FC.Children = ({ children }) => {
  return (
    <TourProvider
      steps={[]}
      maskClassName={style["rt-mask"]}
      className={style["rt-popover"]}
      position="left"
      padding={{ mask: 0 }}
      styles={tourProviderStyles}
      showCloseButton={false}
      disableInteraction
      disableDotsNavigation
      disableKeyboardNavigation
      onClickMask={onClickTourMask}
      prevButton={CustomTourPrevButton}
      nextButton={CustomTourNextButton}
    >
      {children}
    </TourProvider>
  );
};
