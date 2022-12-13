import React, { memo } from "react";

import { Icon } from "@/assets/icons";

import { Button, DropdownConfirm, Tooltip } from "../../elements";

type TProps = {
  title?: string;
  handleEvent: {
    edit: () => void;
    delete?: () => void;
    restore?: () => void;
  };
  titleDelete?: "Lưu trữ" | "Xóa" | string;
  isShowLoading?: boolean;
  isShowRestore?: boolean;
  disableSubmit?: boolean;
  isShowDelete?: boolean;
};

const _DeleteAndEditField: React.FC<TProps> = ({
  title,
  isShowLoading = false,
  isShowRestore = false,
  titleDelete = "Lưu trữ",
  handleEvent,
  disableSubmit = false,
  isShowDelete = true,
}) => {
  return (
    <div className="flex items-center justify-center w-fit gap-4">
      <Tooltip content="Chỉnh sửa" space={8}>
        <Button
          style="none"
          size="none"
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
        <Tooltip content="Khôi phục" space={8}>
          <Button
            style="none"
            size="none"
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
        <>
          {isShowDelete && (
            <DropdownConfirm
              title={title}
              placement={"bottom-right"}
              icon={
                disableSubmit && (
                  <i className="text-yellow-400 fas fa-exclamation-triangle" />
                )
              }
              disableSubmit={disableSubmit}
              handleEvent={{ title: titleDelete, event: handleEvent.delete }}
            >
              <Tooltip content={titleDelete} space={8}>
                <Button
                  className="flex items-center justify-center group"
                  style="none"
                  size="none"
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
        </>
      )}
    </div>
  );
};

export const DeleteAndEditField = memo(_DeleteAndEditField);
