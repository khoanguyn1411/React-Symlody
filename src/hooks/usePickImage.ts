import { useCallback, useEffect, useState } from "react";

import { EFile } from "@/constants";

import { useEffectSkipFirstRender } from "./useEffectSkipFirstRender";

type TFileData = {
  url: string | ArrayBuffer;
  type: EFile;
};

type THookPickImage = {
  defaultImageLink?: string;
  file: File;
  setFile: (file: File) => void;
  inputFileRef: React.MutableRefObject<HTMLInputElement>;
  onImageOverSize?: () => void;
  onPreviewSuccess?: () => void;
  onNotImageType?: () => void;
};

export const usePickImage = ({
  defaultImageLink,
  file,
  inputFileRef,
  setFile,
  onImageOverSize,
  onNotImageType,
  onPreviewSuccess,
}: THookPickImage) => {
  const [fileData, setFileData] = useState<TFileData>({
    url: defaultImageLink,
    type: EFile.Image,
  });

  const handleOpenSelectFile = () => {
    if (!inputFileRef.current) {
      return;
    }
    inputFileRef.current.click();
  };

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setFileData({ url: null, type: EFile.Image });
  }, [setFile]);

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file.size > 10e6) {
      onImageOverSize?.();
      return;
    }
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      onNotImageType?.();
      return;
    }
    onPreviewSuccess?.();
    setFile(file);
  };

  const handleResetInput = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = null;
  };

  console.log(file);

  useEffectSkipFirstRender(() => {
    setFile(undefined);
    setFileData({ url: defaultImageLink, type: EFile.Image });
  }, [defaultImageLink, handleRemoveFile, setFile]);

  useEffectSkipFirstRender(() => {
    let fileReader: FileReader = null,
      isCancel = false;
    if (!file) {
      return;
    }

    fileReader = new FileReader();
    fileReader.onload = (event) => {
      const { result } = event.target;
      if (result && !isCancel) {
        setFileData({ type: EFile.Image, url: result });
      }
    };
    fileReader.readAsDataURL(file);
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, handleRemoveFile]);

  const isHasImage = fileData && fileData.url && fileData.type === EFile.Image;

  return {
    handleResetInput,
    handleUploadFile,
    handleOpenSelectFile,
    handleRemoveFile,
    isHasImage,
    fileData,
  };
};
