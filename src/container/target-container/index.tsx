import React from "react";

import { NoData } from "@/components";

import { TARGET_NO_DATA_CONFIG } from "./constant";

export const TargetContainer: React.FC = () => {
  return (
    <>
      <NoData
        imageSrc={TARGET_NO_DATA_CONFIG.imageSrc}
        title={TARGET_NO_DATA_CONFIG.title}
        buttonTitle={TARGET_NO_DATA_CONFIG.buttonTitle}
        content={TARGET_NO_DATA_CONFIG.content}
        onCreateNew={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
