import React, { memo, useEffect, useRef, useState } from "react";

import { Icon } from "@/assets/icons";
import { Button } from "@/components/elements";
import { FormatService } from "@/utils";

import { PICK_IMAGE_MESSAGE } from "./contants";
import { EAllowFiles } from "./type";

type TFileData = {
  url: string | ArrayBuffer;
  type: EAllowFiles;
};

type TProps = {
  defaultImageLink?: string;
  file: File;
  setFile: (file: File) => void;
};

const _PickImage: React.FC<TProps> = ({ file, defaultImageLink, setFile }) => {
  const [fileData, setFileData] = useState<TFileData>({
    url: defaultImageLink,
    type: EAllowFiles.Image,
  });
  const [message, setMessage] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>();
  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file.size > 10e6) {
      setMessage(PICK_IMAGE_MESSAGE.overSize);
      return;
    }
    setMessage("");
    setFile(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileData(null);
  };

  const handleOpenSelectFile = () => {
    if (!inputFileRef.current) {
      return;
    }
    inputFileRef.current.click();
  };

  const handleResetInput = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = null;
  };

  useEffect(() => {
    let fileReader: FileReader = null,
      isCancel = false;
    if (!file) {
      return;
    }

    fileReader = new FileReader();
    fileReader.onload = (event) => {
      const { result } = event.target;
      if (result && !isCancel) {
        setFileData((prev) => ({ ...prev, url: result }));
      }
    };
    fileReader.readAsDataURL(file);
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className="flex flex-col">
      <input
        ref={inputFileRef}
        type="file"
        accept={EAllowFiles.Image}
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
            Cho phép upload file dưới 10Mb
          </span>
        </>
      )}

      {fileData && fileData.url && (
        <div className="w-full">
          {fileData.type === EAllowFiles.Image && (
            <>
              <div className="relative h-44 w-[fit-content] drop-shadow-md">
                <img
                  alt="img-preview"
                  className="object-cover object-left h-full rounded-md"
                  src={FormatService.toString(fileData.url)}
                />
                <button
                  onClick={handleRemoveFile}
                  type="button"
                  className="absolute top-0 right-0 z-10 flex items-center justify-center w-6 h-6 m-2 text-white rounded-full cursor-pointer bg-backdrop-main"
                >
                  <i className="far fa-times"></i>
                </button>
              </div>
              {message && (
                <h1 className="mt-3 italic text-alert-300">{message}</h1>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const PickImage = memo(_PickImage);