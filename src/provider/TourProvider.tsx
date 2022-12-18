import { TourProvider } from "@reactour/tour";

import {
  customTourClickMask,
  customTourNextButton,
  customTourPrevButton,
  tourProviderStyles,
} from "@/components";
import { AppReact } from "@/utils/types";

export const AppTourProvider: AppReact.FC.Children = ({ children }) => {
  return (
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
      {children}
    </TourProvider>
  );
};
