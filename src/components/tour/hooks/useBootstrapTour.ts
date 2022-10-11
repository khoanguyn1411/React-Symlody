import { useTour } from "@reactour/tour";
import { useEffect } from "react";

import { BREAKPOINTS } from "@/constants";
import useWindowSize from "@/hooks/useWindowSize";
import { delay } from "@/utils";

import { ITourStepType } from "../types";

type IParams = {
  steps: ITourStepType[];
  isOpen: boolean;
  currentStep?: number;
  openDelay?: number;
  onOpen?: () => void;
};

export const useBootstrapTour = ({
  steps,
  isOpen,
  currentStep = 0,
  openDelay = 1500,
  onOpen,
}: IParams) => {
  const tour = useTour();
  const { width } = useWindowSize();

  useEffect(() => {
    const bootstrap = async () => {
      const isDesktop = width >= BREAKPOINTS.lg;
      const shouldOpen = isOpen && !tour.isOpen;

      if (isDesktop && shouldOpen) {
        tour.setSteps(steps);
        tour.setCurrentStep(currentStep);

        await delay(openDelay);

        tour.setIsOpen(true);
        onOpen && onOpen();
      }
    };

    bootstrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
};
