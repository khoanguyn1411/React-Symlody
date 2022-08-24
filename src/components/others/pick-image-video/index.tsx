import React, { useEffect, useRef, useState } from "react";

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
  const handleOpenSelectFile = () => {
    if (!inputFileRef.current) {
      return;
    }
    inputFileRef.current.click();
  };

  const handleRemoveFile = () => {
    setFile(undefined);
    setFileData(undefined);
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
        onChange={handleUploadFile}
      />
      {!file && (
        <>
          <button
            type="button"
            onClick={handleOpenSelectFile}
            className="px-3 py-2 font-medium border border-gray-300 min-w-max w-[fit-content] text-primary-800 rounded-md"
          >
            <span className="mr-2">
              <i className="far fa-upload"></i>
            </span>{" "}
            Thêm file
          </button>
          <span className="mt-1 italic text-gray-400">
            Cho phép upload file dưới 10Mb
          </span>
        </>
      )}

      {fileData && (
        <div className="relative w-full">
          <button
            onClick={handleRemoveFile}
            type="button"
            className="absolute right-0 z-10 flex items-center justify-center w-6 h-6 m-2 rounded-full cursor-pointer bg-secondary-200"
          >
            <i className="far fa-times"></i>
          </button>
          {fileData && fileData.type === "video.*" && (
            <video src={fileData.url.toString()} controls className="w-full">
              <track kind="captions" />
            </video>
          )}

          {fileData && fileData.type === "image.*" && (
            <img
              alt="img-preview"
              className="w-full"
              src={fileData.url.toString()}
            />
          )}
        </div>
      )}
    </div>
  );
};
