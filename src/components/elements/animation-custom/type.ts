import { ReactNode } from "react";

export type TAnimationEffectsProps = {
  className?: string;
  isShowing: boolean;
  children: ReactNode;
  attrs?: React.HTMLAttributes<HTMLDivElement>;
};
