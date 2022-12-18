import React from "react";

import { Icon } from "@/assets/icons";
import { AppReact } from "@/utils/types";

type TProps = {
  isPriority: boolean;
};

export const _TodoStatusIcon: React.FC<TProps> = ({ isPriority }) => {
  if (isPriority) {
    return <Icon.ArrowUp size="small" customColor="secondary" />;
  }
  return <Icon.Hamburger2 size="small" customColor="yellow" />;
};

export const TodoPriorityIcon: React.FC<
  TProps & { onClick?: AppReact.Button.EventHandler }
> = ({ isPriority, onClick }) => {
  return (
    <button onClick={onClick}>
      <_TodoStatusIcon isPriority={isPriority} />
    </button>
  );
};
