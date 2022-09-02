import { GlobalTypes } from "@/global";

import { Button } from "./button-default";
import { TPropsButton } from "./types";

export const ButtonCreate: GlobalTypes.FCPropsWithChildren<TPropsButton> = (
  props
) => {
  return (
    <Button prefix={<i className="mr-2 fas fa-plus-circle" />} {...props}>
      {props.children}
    </Button>
  );
};
