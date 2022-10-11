import React from "react";

import { Icon } from "@/assets/icons";

type TProps = {
  isPriority: boolean;
};

export const _TodoStatusIcon: React.FC<TProps> = ({ isPriority }) => {
  if (isPriority) {
    return <Icon.ArrowUp size="small" customColor="secondary" />;
  }
  return <Icon.Hamburger2 size="small" customColor="yellow" />;
};

export const TodoPriorityIcon: React.FC<TProps> = ({ isPriority }) => {
  return (
    <button>
      <_TodoStatusIcon isPriority={isPriority} />
    </button>
  );
};
