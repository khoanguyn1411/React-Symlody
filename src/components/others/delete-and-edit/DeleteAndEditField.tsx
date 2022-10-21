import React from "react";

import { Icon } from "@/assets/icons";

import { Button, DropdownConfirm, Tooltip } from "../../elements";

type TProps = {
  title: string;
  handleEvent: {
    edit: () => void;
    delete: () => void;
    restore?: () => void;
  };
  titleDelete?: "Lưu trữ" | "Xóa";
  isShowLoading?: boolean;
  isShowRestore?: boolean;
  disableSubmit?: boolean;
};

export const DeleteAndEditField: React.FC<TProps> = ({
  title,
  isShowLoading = false,
  isShowRestore = false,
  titleDelete = "Lưu trữ",
  handleEvent,
  disableSubmit = false,
}) => {
  return (
    <div className="flex items-center justify-center w-fit gap-4">
      <Tooltip content="Chỉnh sửa" space={-2}>
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

      {isShowRestore ? (
        <Tooltip content="Khôi phục" space={-2}>
          <Button
            style="none"
            isIconOnly
            isShowLoading={isShowLoading}
            onClick={handleEvent.restore}
            className="flex items-center justify-center group"
          >
            {!isShowLoading && (
              <i className="text-gray-400 transition-all duration-200 group-hover:text-black fas fa-trash-restore-alt"></i>
            )}
          </Button>
        </Tooltip>
      ) : (
        <DropdownConfirm
          title={title}
          placement={"bottom-right"}
          disableSubmit={disableSubmit}
          handleEvent={{ title: titleDelete, event: handleEvent.delete }}
        >
          <Tooltip content={titleDelete} space={-2}>
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
      )}
    </div>
  );
};
