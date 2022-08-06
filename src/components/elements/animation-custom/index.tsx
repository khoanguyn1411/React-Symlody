import styled from "@emotion/styled";
import React, { ReactNode } from "react";

const AnimateModule = styled.div`
  .animate__fadeIn {
    --animate-duration: 0.15s;
  }
`;

type TProps = {
  children: ReactNode;
};

export const AnimationCustom: React.FC<TProps> = ({ children }) => {
  return <AnimateModule>{children}</AnimateModule>;
};
