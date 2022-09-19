/* eslint-disable @typescript-eslint/ban-ts-comment */
import UploadPreview from "@rpldy/upload-preview";
import Uploady from "@rpldy/uploady";
import React, { useRef } from "react";

import { ButtonUpload } from "./UploadButton";
import { ItemPreviewWithCrop } from "./UploadCrop";

type Props = {
  onResponse: (response: string, status: number) => void;
  avatar: string;
  char: string;
};

export const AvatarUpload: React.FC<Props> = ({ onResponse, avatar, char }) => {
  const previewMethodsRef = useRef();

  return (
    <Uploady
      listeners={{
        onResponse: (props) => console.log(props),
        onprogress: (props) => console.log(props),
      }}
      formatServerResponse={onResponse}
      accept="image/*"
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
        fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
      />
    </Uploady>
  );
};
