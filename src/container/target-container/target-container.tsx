import React from "react";

import { NoData } from "@/components";

import { TARGET_NO_DATA_CONFIG } from "./constant";

export const TargetContainer: React.FC = () => {
  return (
    <>
      <NoData
        data={TARGET_NO_DATA_CONFIG}
        onCreateNew={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
