import React from "react";

import { DropdownConfirm, Tooltip } from "@/components";

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
    <div className="flex items-center justify-center w-full gap-4">
      <Tooltip content="Chỉnh sửa" placement="top" offset={-35}>
        <button
          onClick={handleEvent.edit}
          className="flex items-center justify-center"
        >
          <i className="fas fa-edit"></i>
        </button>
      </Tooltip>
      <DropdownConfirm
        title={title}
        handleEvent={{ title: "Xóa", event: handleEvent.delete }}
      >
        <Tooltip offset={-15} content="Xoá" placement="top">
          <button className="flex items-center justify-center">
            <i className="fas fa-trash-alt"></i>
          </button>
        </Tooltip>
      </DropdownConfirm>
    </div>
  );
};
