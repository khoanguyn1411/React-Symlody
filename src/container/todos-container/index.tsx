import React from "react";

import { NoData } from "@/components";

import { TODOS_NO_DATA_CONFIG } from "./constant";

export const TodosContainer: React.FC = () => {
  return (
    <>
      <NoData
        imageSrc={TODOS_NO_DATA_CONFIG.imageSrc}
        title={TODOS_NO_DATA_CONFIG.title}
        buttonTitle={TODOS_NO_DATA_CONFIG.buttonTitle}
        content={TODOS_NO_DATA_CONFIG.content}
        onCreateNew={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
