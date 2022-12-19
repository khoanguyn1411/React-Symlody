import classNames from "classnames";
import React, { useRef, useState } from "react";

import { Icon } from "@/assets/icons";
import { images } from "@/assets/images";
import {
  APP_ERROR_MESSAGE,
  DEFAULT_LIMIT_FILE_SIZE_READABLE,
  EFile,
} from "@/constants";
import { useModal, usePickImage } from "@/hooks";

import { Avatar } from "../../avatar";
import { Dialog } from "../../dialog";

type TProps = {
  defaultImageLink?: string;
  file: File;
  alt: string;
  isUserAvatar?: boolean;
  fullName?: string;
  isDisable?: boolean;
  setFile: (file: File) => void;
};

export const UploadedAvatar: React.FC<TProps> = ({
  file,
  defaultImageLink,
  alt = "",
  isDisable = false,
  isUserAvatar = false,
  fullName = "",
  setFile,
}) => {
  const inputFileRef = useRef<HTMLInputElement>();
  const dialogProps = useModal();
  const [message, setMessage] = useState<string>("");

  const handleOpenDialog = () => {
    dialogProps.toggle.setShow();
  };

  const handleWrongFileFormat = () => {
    handleOpenDialog();
    setMessage(APP_ERROR_MESSAGE.FILE_ERROR.NOT_IMAGE);
  };

  const handleOversizeImage = () => {
    handleOpenDialog();
    setMessage(
      APP_ERROR_MESSAGE.FILE_ERROR.OVERSIZE(DEFAULT_LIMIT_FILE_SIZE_READABLE)
    );
  };

  const {
    handleResetInput,
    handleUploadFile,
    handleOpenSelectFile,
    fileData,
    isHasImage,
  } = usePickImage({
    file,
    defaultImageLink,
    inputFileRef,
    isDisable,
    setFile,
    onNotImageType: handleWrongFileFormat,
    onImageOverSize: handleOversizeImage,
  });

  return (
    <div className="relative w-full group w-[fit-content]">
      <button
        className={classNames("w-32 h-32 rounded-full", {
          "cursor-default": isDisable,
        })}
        type="button"
        onClick={handleOpenSelectFile}
      >
        {isUserAvatar ? (
          <Avatar
            src={isHasImage ? fileData.url.toString() : ""}
            size="avatar"
            fullName={fullName}
          />
        ) : (
          <img
            alt={alt}
            className="object-cover object-left w-full h-full rounded-full"
            src={isHasImage ? fileData.url.toString() : images.Logo}
          />
        )}
      </button>
      <input
        ref={inputFileRef}
        type="file"
        accept={EFile.Image}
        className="hidden"
        onClick={handleResetInput}
        onChange={handleUploadFile}
      />
      <div
        hidden={isDisable}
        className={classNames(
          "absolute top-0 left-0 w-32 h-32 bg-gray-200 rounded-full opacity-0 pointer-events-none transition-opacity group-hover:opacity-40"
        )}
      />

      <button
        onClick={handleOpenSelectFile}
        type="button"
        hidden={isDisable}
        className="absolute bottom-0 text-gray-600 bg-white p-1.5 rounded-md left-[88px]"
      >
        <Icon.Camera customColor="gray" />
      </button>

      <Dialog title="Lỗi" {...dialogProps}>
        <h1>{message}</h1>
      </Dialog>
    </div>
  );
};
