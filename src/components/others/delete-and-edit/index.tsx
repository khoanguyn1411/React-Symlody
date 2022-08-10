import React from "react";

import { DropdownConfirm } from "@/components";

type TProps = {
  title: string;
  handleEvent: {
    edit: () => void;
    delete: () => void;
  };
};

export const DeleteAndEditField: React.FC<TProps> = ({
  title,
  handleEvent,
}) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={handleEvent.edit}
        className="flex items-center justify-center"
      >
        <i className="fas fa-edit"></i>
      </button>
      <DropdownConfirm
        title={title}
        handleEvent={{ title: "Xóa", event: handleEvent.delete }}
      >
        <button className="flex items-center justify-center">
          <i className="fas fa-trash-alt"></i>
        </button>
      </DropdownConfirm>
    </div>
  );
};
