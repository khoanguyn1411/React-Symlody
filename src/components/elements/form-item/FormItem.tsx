import classNames from "classnames";
import React, { useEffect, useRef } from "react";

type IFormItemProps = {
  label?: string;
  subLabel?: JSX.Element;
  error?: string;
  description?: string;
  isRequired?: boolean;
  isNoSpace?: boolean;
  isHidden?: boolean;
  children: JSX.Element;
};

export const FormItem: React.FC<IFormItemProps> = ({
  label,
  error,
  description,
  isRequired,
  isNoSpace,
  isHidden,
  children,
  subLabel,
}) => {
  const focusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (error && focusRef) {
      focusRef.current.scrollIntoView({ block: "center" });
    }
  }, [error]);
  return (
    <div
      className={classNames({
        "mb-5": !isNoSpace,
        hidden: isHidden,
      })}
    >
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor="title"
            className="block mb-2 font-medium text-black line-height-normal"
          >
            {label}{" "}
            {isRequired ? <span className="text-red-400">*</span> : null}
          </label>
        )}

        {subLabel ? subLabel : <React.Fragment />}
      </div>

      <div ref={focusRef}>{children}</div>

      {error && (
        <div className="flex justify-start mt-2">
          <span className=" text-red-400 animate__animated animate__fadeIn animate__faster">
            {error}
          </span>
        </div>
      )}

      {description && (
        <div className="mt-2">
          <span className="text-gray-400">{description}</span>
        </div>
      )}
    </div>
  );
};
