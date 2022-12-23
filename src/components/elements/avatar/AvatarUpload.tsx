/* eslint-disable @typescript-eslint/ban-ts-comment */
import UploadPreview, { PreviewItem } from "@rpldy/upload-preview";
import Uploady from "@rpldy/uploady";
import React, { useRef } from "react";

import { EFile } from "@/features/types/models/base-models/file";

import { ButtonUpload } from "./UploadButton";
import { ItemPreviewWithCrop } from "./UploadCrop";

type Props = {
  onResponse: (previews: PreviewItem) => void;
  avatar: string;
  char: string;
};

export const AvatarUpload: React.FC<Props> = ({ onResponse, avatar, char }) => {
  const previewMethodsRef = useRef();
  const onPreviewsChanged = (previews: PreviewItem[]) => {
    onResponse(previews[0]);
  };

  return (
    <Uploady
      formatServerResponse={null}
      accept={EFile.Image}
      destination={{
        url: "",
        // headers: { Authorization: `Bearer ${Api.getToken()}` },
      }}
    >
      <ButtonUpload extraProps={{ url: avatar, char }} />

      <UploadPreview
        //@ts-ignore
        PreviewComponent={ItemPreviewWithCrop}
        previewComponentProps={{ previewMethods: previewMethodsRef }}
        previewMethodsRef={previewMethodsRef}
        rememberPreviousBatches
        onPreviewsChanged={onPreviewsChanged}
        // fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
      />
    </Uploady>
  );
};
