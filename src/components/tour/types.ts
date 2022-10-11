import { StepType } from "@reactour/tour";
import { Dispatch } from "react";

export type ITourNextClickProps = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: Dispatch<React.SetStateAction<number>>;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export type ITourMaskClickProps = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: Dispatch<React.SetStateAction<number>>;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export type ITourStepType = StepType & {
  nextTitle?: string;
  onNextClick?: (props: ITourNextClickProps) => void;
  onMaskClick?: (props: ITourMaskClickProps) => void;
};

export type ITourBtnProps = {
  steps?: ITourStepType[];
  stepsLength: number;
  currentStep: number;

  setCurrentStep: Dispatch<React.SetStateAction<number>>;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export type ITourClickMaskProps = {
  steps?: ITourStepType[];
  currentStep: number;

  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: Dispatch<React.SetStateAction<number>>;
};
