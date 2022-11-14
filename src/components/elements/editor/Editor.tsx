/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

type IEvent = {
  target: { value: string };
};

type IProps = {
  value?: string;
  placeholder?: string;
  onChange?: (event: IEvent) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

export const Editor: React.FC<IProps> = ({
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}) => {
  if (value == null) {
    value = "";
  }
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRendered(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!isRendered) {
    return <div className="w-full h-20 border bg-gray-50 rounded-md" />;
  }

  return (
    <div className="SymphonyEditor">
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder,
          extraPlugins: [],
        }}
        data={value}
        onChange={(_event: any, editor: any) => {
          const data = editor.getData();

          if (onChange) {
            onChange({
              target: {
                value: data,
              },
            });
          }
        }}
        onBlur={() => {
          onBlur && onBlur();
        }}
        onFocus={() => {
          onFocus && onFocus();
        }}
      />
    </div>
  );
};
