import React from "react";

import { Button } from "@/components";
import { TPropsButton } from "@/components/elements/button/types";
import { AppReact } from "@/utils/types";

interface TProps extends TPropsButton {
  onSubmit?: () => void;
}

export const ConfigSubmitButton: AppReact.FC.PropsWithChildren<TProps> = ({
  children,
  onSubmit,
  ...props
}) => {
  return (
    <div className="flex justify-end">
      <Button {...props} onClick={onSubmit}>
        {children ?? "Lưu"}
      </Button>
    </div>
  );
};
