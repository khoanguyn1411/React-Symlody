import React from "react";

import { Button } from "@/components";
import { GlobalTypes } from "@/utils";

type TProps = {
  isSubmitting?: boolean;
  onSubmit?: () => void;
};

export const ConfigSubmitButton: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <div className="flex justify-end">
      <Button isShowLoading={isSubmitting} className="w-24" onClick={onSubmit}>
        {children ?? "Lưu"}
      </Button>
    </div>
  );
};
