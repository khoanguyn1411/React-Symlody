import React from "react";

import { Button } from "@/components";
import { GlobalTypes } from "@/utils";

export const ConfigSubmitButton: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <div className="flex justify-end">
      <Button className="w-24" type="submit">
        {children ?? "Lưu"}
      </Button>
    </div>
  );
};
