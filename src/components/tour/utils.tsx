import { Button } from "../elements";
import { ITourBtnProps, ITourClickMaskProps } from "./types";

export const customTourPrevButton = () => {
  return null;
};

export const customTourNextButton = ({
  stepsLength,
  currentStep,
  setIsOpen,
  setCurrentStep,
  steps,
}: ITourBtnProps) => {
  const step = steps[currentStep];

  if (step?.disableActions) {
    return null;
  }

  if (currentStep === stepsLength - 1) {
    return (
      <Button
        size="small"
        onClick={
          step.onNextClick
            ? () =>
                step.onNextClick({
                  stepsLength,
                  currentStep,
                  setIsOpen,
                  setCurrentStep,
                })
            : () => setIsOpen(false)
        }
      >
        {step?.nextTitle || "Hoàn thành"}
      </Button>
    );
  }

  return (
    <Button
      size="small"
      onClick={
        step.onNextClick
          ? () =>
              step.onNextClick({
                stepsLength,
                currentStep,
                setIsOpen,
                setCurrentStep,
              })
          : () => setCurrentStep(currentStep + 1)
      }
    >
      {step?.nextTitle || "Tiếp theo"}
    </Button>
  );
};

export const customTourClickMask = ({
  steps,
  currentStep,
  setIsOpen,
  setCurrentStep,
}: ITourClickMaskProps) => {
  const step = steps?.[currentStep];

  if (typeof step?.onMaskClick === "function") {
    step.onMaskClick({
      stepsLength: steps.length,
      currentStep,
      setIsOpen,
      setCurrentStep,
    });
    return;
  }

  if (currentStep < steps.length - 1) {
    setCurrentStep((v) => v + 1);
  }
};
