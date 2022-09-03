import { GlobalTypes } from "@/global";

import { Tooltip } from "../tooltip";
import { Button } from "./button-default";
import { TPropsButton } from "./types";

export const ButtonCreate: GlobalTypes.FCPropsWithChildren<TPropsButton> = (
  props
) => {
  return (
    <Tooltip
      content={`${props.children as string} (c)`}
      placement="bottom-right"
    >
      <Button prefix={<i className="mr-2 fas fa-plus-circle" />} {...props}>
        {props.children}
      </Button>
    </Tooltip>
  );
};
