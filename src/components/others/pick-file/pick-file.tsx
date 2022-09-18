import classNames from "classnames";
import React, { useRef, useState } from "react";

import { Icon } from "@/assets/icons";
import { Button } from "@/components";
import { FileService } from "@/utils";

import { PICK_FILE_MESSAGE } from "./constant";

type TProps = {
  selectedFile: File;
  message: string;
  setSelectedFile: (file: File) => void;
  setMessage: (message: string) => void;
};
export * from "./constant";
export const PickFile: React.FC<TProps> = ({
  selectedFile,
  message,
  setSelectedFile,
  setMessage,
}) => {
  const inputFileRef = useRef<HTMLInputElement>();
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [dragCounter, setDragCounter] = useState<number>(0);

  const handlePickFile = () => {
    if (!inputFileRef.current) {
      return;
    }
    inputFileRef.current.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleResetInput = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = null;
  };

  const handlePickedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files) {
      setMessage(PICK_FILE_MESSAGE.defaultExtension);
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragCounter(dragCounter + 1);
      setIsDragActive(true);
    } else if (event.type === "dragleave") {
      setDragCounter(dragCounter - 1);
      if (dragCounter > 0) return;
      setIsDragActive(false);
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    if (!FileService.isCorrectExtension(event.dataTransfer.files[0].name)) {
      setMessage(PICK_FILE_MESSAGE.wrongExtension);
      return;
    }
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
      setMessage(PICK_FILE_MESSAGE.defaultExtension);
      return;
    }
  };

  return (
    <>
      <div
        onDragEnter={handleDrag}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        className={classNames(
          "flex flex-col items-center justify-center border-gray-400 px-3 pb-5 mt-3 border-2 border-dashed dashed-border rounded-md",
          isDragActive && "bg-gray-100"
        )}
      >
        <span className="my-4 mt-4">
          <Icon.Upload size="large" />
        </span>
        {!isDragActive && (
          <p className="text-lg text-center">
            Kéo và thả file vào đây để <br /> bắt đầu tải lên.
          </p>
        )}
        {isDragActive && (
          <p className="text-lg text-center">Thả file vào đây.</p>
        )}
        <div className="flex items-center w-2/3 mt-4 gap-3">
          <div className="flex-1 bg-black h-[1px]" />
          <span>HOẶC</span>
          <div className="flex-1 bg-black h-[1px]" />
        </div>
        <Button className="px-5 mt-4" onClick={handlePickFile}>
          Chọn file
        </Button>
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          className="hidden"
          ref={inputFileRef}
          onClick={handleResetInput}
          onChange={handlePickedFile}
        />
      </div>
      {selectedFile && (
        <div className="flex justify-between mt-3">
          <div className="w-5/6">
            <p className="items-center block truncate cursor-pointer">
              <i className="max-w-full mr-3  fas fa-link" />
              {selectedFile.name}
            </p>
          </div>

          <button type="button" onClick={handleRemoveFile}>
            <Icon.Trash
              size="medium"
              customColor="text"
              className="text-black cursor-pointer hover:text-red-500 transition-colors duration-300"
            />
          </button>
        </div>
      )}
      <div className="flex flex-col items-center justify-center mt-6 mb-5">
        <span
          className={classNames(
            "italic w-3/4 text-center",
            message !== PICK_FILE_MESSAGE.defaultExtension && "text-red-500"
          )}
        >
          {message}
        </span>
        <span className="mt-1 font-semibold underline cursor-pointer text-primary-800">
          Tải file mẫu (.xslx)
        </span>
      </div>
    </>
  );
};
