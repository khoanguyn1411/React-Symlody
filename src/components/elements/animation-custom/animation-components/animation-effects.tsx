import styled from "@emotion/styled";
import classNames from "classnames";
import React, { ReactNode } from "react";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  className?: string;
  isShowing: boolean;
  children: ReactNode;
  attrs?: React.HTMLAttributes<HTMLDivElement>;
};

const AnimateModule = styled.div`
  --animate-duration: ${ANIMATION_DEFAULT_TIME / 1000}s;
`;

export const AnimationEffects: React.FC<TProps> = ({
  className,
  isShowing,
  children,
  attrs,
}) => {
  return (
    <AnimateModule>
      <div
        {...attrs}
        className={classNames(`animate__fadeIn animate__animated`, className, {
          animate__fadeOut: !isShowing,
        })}
      >
        {children}
      </div>
    </AnimateModule>
  );
};
