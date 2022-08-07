import styled from "@emotion/styled";
import React, { ReactNode } from "react";

import { ANIMATION_DEFAULT_TIME } from "./constants";

const AnimateModule = styled.div`
  .animate__fadeIn {
    --animate-duration: ${ANIMATION_DEFAULT_TIME / 1000}s;
  }
`;

type TProps = {
  children: ReactNode;
};

export const AnimationCustom: React.FC<TProps> = ({ children }) => {
  return <AnimateModule>{children}</AnimateModule>;
};
