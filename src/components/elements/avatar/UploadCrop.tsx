/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  useItemFinalizeListener,
  withRequestPreSendUpdate,
} from "@rpldy/uploady";
import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import { Modal } from "../modal";
import cropImage from "./function";

export const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const {
    //@ts-ignore
    url,
    //@ts-ignore
    updateRequest,
    //@ts-ignore
    requestData,
    id,
    //@ts-ignore
    isFallback,
    //@ts-ignore
    type,
    //@ts-ignore
    previewMethods,
  } = props;
  const ref = useRef<ReactCrop>(null);
  const [finished, setFinished] = useState(false);
  const [imageUpload, setImageUpload] = useState<HTMLImageElement>(new Image());
  const [crop, setCrop] = useState<Crop>({
    aspect: 1,
    width: 128,
    height: 128,
    unit: "px",
    x: 0,
    y: 0,
  });

  useItemFinalizeListener(() => {
    setFinished(true);
  }, id);

  const onUploadCrop = async () => {
    if (updateRequest && (crop?.height || crop?.width)) {
      const newRequestData = requestData;
      setFinished(true);
      newRequestData.items[0].file = await cropImage(
        imageUpload,
        newRequestData.items[0].file,
        crop
      );

      updateRequest({ items: newRequestData.items });
    }
  };

  const onCancel = () => {
    updateRequest(false);
    if (previewMethods.current?.clear) {
      previewMethods.current?.clear();
    }
  };

  const onImageLoaded = (image: HTMLImageElement) => {
    const size = Math.min(image.width, image.height);
    setCrop({ aspect: 1, width: size, height: size, x: 0, y: 0, unit: "px" });

    setImageUpload(image);
    return false;
  };

  const visible = !isFallback && type === "image" && !!requestData && !finished;

  return (
    <Modal
      title="Cập nhật ảnh"
      isShowing={visible}
      toggle={{ setToggle: onCancel }}
      handleEvent={{
        title: "Cập nhật",
        event: onUploadCrop,
      }}
    >
      <ReactCrop
        ref={ref}
        minWidth={128}
        minHeight={128}
        onImageLoaded={onImageLoaded}
        src={url}
        crop={crop}
        onComplete={(crop) => {
          setCrop({ ...crop, aspect: 1 });
        }}
        onChange={(crop) => setCrop({ ...crop, aspect: 1 })}
      />
    </Modal>
  );
});
