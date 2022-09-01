import React, { useEffect, useRef, useState } from "react";

import { Icon } from "@/assets/icons";
import { Button } from "@/components/elements";

type TFileData = {
  url: string | ArrayBuffer;
  type: "video.*" | "image.*";
};

export const PickImageVideo: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [fileData, setFileData] = useState<TFileData>();
  const inputFileRef = useRef<HTMLInputElement>();
  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file.size > 10e6) {
      // Add message for oversize image.
      return;
    }
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
        if (file.type.match("video.*")) {
          setFileData((prev) => ({ ...prev, type: "video.*" }));
        } else {
          setFileData((prev) => ({ ...prev, type: "image.*" }));
        }
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
        accept="image/*, video/*"
        className="hidden"
        onClick={handleResetInput}
        onChange={handleUploadFile}
      />
      {!file && (
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

      {fileData && (
        <div className="w-full">
          {fileData && fileData.type === "video.*" && (
            <video src={fileData.url.toString()} controls className="w-full">
              <track kind="captions" />
            </video>
          )}

          {fileData && fileData.type === "image.*" && (
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
          )}
        </div>
      )}
    </div>
  );
};
