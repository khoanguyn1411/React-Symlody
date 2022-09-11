import classNames from "classnames";
import React from "react";

import { Icon } from "@/assets/icons";
import { Button, DropdownConfirm, Tooltip } from "@/components";

type TProps = {
  title: string;
  handleEvent: {
    edit: () => void;
    delete: () => void;
  };
  isShowLoading?: boolean;
};

export const DeleteAndEditField: React.FC<TProps> = ({
  title,
  isShowLoading,
  handleEvent,
}) => {
  return (
    <div className="flex items-center justify-center w-fit gap-4">
      <Tooltip content="Chỉnh sửa">
        <Button
          style="none"
          isIconOnly
          onClick={handleEvent.edit}
          className="flex items-center justify-center group"
        >
          <Icon.Edit
            customColor="gray"
            size="small"
            className="group-hover:text-black transition-all duration-200"
          />
        </Button>
      </Tooltip>
      <DropdownConfirm
        title={title}
        placement={"bottom-right"}
        handleEvent={{ title: "Xóa", event: handleEvent.delete }}
      >
        <Tooltip content="Xoá">
          <Button
            className="flex items-center justify-center group"
            style="none"
            isIconOnly
            isShowLoading={isShowLoading}
          >
            {!isShowLoading && (
              <Icon.Trash
                customColor="gray"
                size="small"
                className="group-hover:text-black transition-all duration-200"
              />
            )}
          </Button>
        </Tooltip>
      </DropdownConfirm>
    </div>
  );
};
