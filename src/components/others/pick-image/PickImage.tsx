import React, { useRef, useState } from "react";

import { Icon } from "@/assets/icons";
import {
  APP_ERROR_MESSAGE,
  DEFAULT_LIMIT_FILE_SIZE_READABLE,
  EFile,
} from "@/constants";
import { usePickImage } from "@/hooks";

import { Button } from "../../elements";

type TProps = {
  defaultImageLink?: string;
  file: File;
  setFile: (file: File) => void;
};

export const PickImage: React.FC<TProps> = ({
  file,
  defaultImageLink,
  setFile,
}) => {
  const [message, setMessage] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>();

  const handleSetOverSizeMessage = () => {
    setMessage(
      APP_ERROR_MESSAGE.FILE_ERROR.OVERSIZE(DEFAULT_LIMIT_FILE_SIZE_READABLE)
    );
  };

  const handleResetMessage = () => {
    setMessage("");
  };

  const {
    handleResetInput,
    handleUploadFile,
    handleOpenSelectFile,
    handleRemoveFile,
    fileData,
  } = usePickImage({
    file,
    defaultImageLink,
    inputFileRef,
    onImageOverSize: handleSetOverSizeMessage,
    onPreviewSuccess: handleResetMessage,
    setFile,
  });

  return (
    <div className="flex flex-col">
      <input
        ref={inputFileRef}
        type="file"
        accept={EFile.Image}
        className="hidden"
        onClick={handleResetInput}
        onChange={handleUploadFile}
      />
      {(!fileData || !fileData.url) && (
        <>
          <Button
            style="outline"
            onClick={handleOpenSelectFile}
            prefix={<Icon.Upload className="mr-3" />}
            className="border-gray-300 w-[fit-content]"
          >
            Thêm file
          </Button>
          <span className="mt-2 italic text-gray-400">
            Cho phép upload file dưới {DEFAULT_LIMIT_FILE_SIZE_READABLE}
          </span>
        </>
      )}

      {fileData && fileData.url && (
        <div className="w-full">
          {fileData.type === EFile.Image && (
            <>
              <div className="relative h-44 w-[fit-content] drop-shadow-md">
                <img
                  alt="img-preview"
                  className="object-cover object-left h-full rounded-md"
                  src={fileData.url.toString()}
                />
                <button
                  onClick={handleRemoveFile}
                  type="button"
                  className="absolute top-0 right-0 z-10 flex items-center justify-center w-6 h-6 m-2 text-white rounded-full cursor-pointer bg-backdrop-main"
                >
                  <i className="far fa-times"></i>
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {message && <h1 className="mt-3 italic text-alert-300">{message}</h1>}
    </div>
  );
};
