import { asUploadButton } from "@rpldy/upload-button";
import { useBatchStartListener, useItemFinishListener } from "@rpldy/uploady";
import React, { useState } from "react";

import { getColorFromText } from "../avatar/utils";

export const ButtonUpload = asUploadButton((props) => {
  const [loading, setLoading] = useState(false);
  useBatchStartListener(() => {
    setLoading(true);
  });

  useItemFinishListener(() => {
    setLoading(false);
  });

  return (
    <div {...props} className="relative w-32 h-32 overflow-hidden rounded-md">
      {props.url ? (
        <img
          alt="user-avatar"
          src={props.url || "/images/default-avatar.png"}
          className="object-cover w-32 h-32 rounded-full cursor-pointer"
        />
      ) : (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ backgroundColor: getColorFromText(props.char) }}
        >
          <span className=" text-4xl text-white">{props.char}</span>
        </div>
      )}
      <div className="absolute top-0 z-10 flex items-center justify-center w-full h-full rounded-full opacity-0 cursor-pointer bg-black/20 hover:opacity-100 transition-opacity duration-300">
        <i className="text-lg fas fa-camera-alt" />
      </div>

      {loading ? (
        <div className="absolute top-0 z-20 flex items-center justify-center w-full h-full opacity-100 bg-white/30">
          <div className="flex items-center justify-center w-20 h-20 animate-spin" />
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
});
