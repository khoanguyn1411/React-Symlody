import React, { useState } from "react";

import { Input } from "../input-default";
import { TInputDefaultProps } from "../type";

export const InputPassword: React.FC<TInputDefaultProps> = (props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const handleTogglePassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsShowPassword((prev) => !prev);
  };
  return (
    <div className="relative">
      <Input {...props} type={!isShowPassword && "password"} />
      <button
        onClick={handleTogglePassword}
        className="absolute top-0 bottom-0 right-0 flex items-center mr-3 text-gray-400 cursor-pointer"
      >
        <i className={`fas ${isShowPassword ? "fa-eye" : "fa-eye-slash"}`} />
      </button>
    </div>
  );
};
