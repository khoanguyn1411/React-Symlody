import React, { useRef } from "react";

import { Icon } from "@/assets/icons";
import { images } from "@/assets/images";
import { EFile } from "@/constants";
import { usePickImage } from "@/hooks";
import { FormatService } from "@/utils";

type TProps = {
  defaultImageLink?: string;
  file: File;
  setFile: (file: File) => void;
};

export const UploadedAvatar: React.FC<TProps> = ({
  file,
  defaultImageLink,
  setFile,
}) => {
  const inputFileRef = useRef<HTMLInputElement>();
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
    setFile,
  });

  return (
    <div className="relative w-full group w-[fit-content]">
      <button
        className="w-32 h-32 rounded-full"
        type="button"
        onClick={handleOpenSelectFile}
      >
        <img
          alt="Logo tổ chức"
          className="object-cover object-left w-full h-full rounded-full"
          src={isHasImage ? FormatService.toString(fileData.url) : images.Logo}
        />
      </button>
      <input
        ref={inputFileRef}
        type="file"
        accept={EFile.Image}
        className="hidden"
        onClick={handleResetInput}
        onChange={handleUploadFile}
      />
      <div className="absolute top-0 left-0 w-32 h-32 bg-gray-200 rounded-full opacity-0 pointer-events-none transition-opacity group-hover:opacity-40" />

      <button
        onClick={handleOpenSelectFile}
        type="button"
        className="absolute bottom-0 text-gray-600 bg-white p-1.5 rounded-md left-[88px]"
      >
        <Icon.Camera customColor="gray" />
      </button>
    </div>
  );
};
