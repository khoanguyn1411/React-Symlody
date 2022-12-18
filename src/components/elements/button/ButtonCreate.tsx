import { AppReact } from "@/utils/types";

import { Tooltip } from "../tooltip";
import { Button } from "./Button";
import { TPropsButton } from "./types";

export const ButtonCreate: AppReact.FC.PropsWithChildren<TPropsButton> = (
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
