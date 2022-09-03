import React from "react";

import { Icon } from "@/assets/icons";
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
    <div className="flex items-center justify-center w-fit gap-4">
      <Tooltip content="Chỉnh sửa">
        <button
          onClick={handleEvent.edit}
          className="flex items-center justify-center group"
        >
          <Icon.Edit
            customColor="gray"
            size="small"
            className="group-hover:text-black transition-all duration-200"
          />
        </button>
      </Tooltip>
      <DropdownConfirm
        title={title}
        placement={"bottom-right"}
        handleEvent={{ title: "Xóa", event: handleEvent.delete }}
      >
        <Tooltip content="Xoá">
          <button className="flex items-center justify-center group">
            <Icon.Trash
              customColor="gray"
              size="small"
              className="group-hover:text-black transition-all duration-200"
            />
          </button>
        </Tooltip>
      </DropdownConfirm>
    </div>
  );
};
