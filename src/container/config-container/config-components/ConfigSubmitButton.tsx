import React from "react";

import { Button } from "@/components";
import { GlobalTypes } from "@/utils";

type TProps = {
  isSubmitting?: boolean;
};

export const ConfigSubmitButton: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  isSubmitting,
}) => {
  return (
    <div className="flex justify-end">
      <Button isShowLoading={isSubmitting} className="w-24" type="submit">
        {children ?? "Lưu"}
      </Button>
    </div>
  );
};
