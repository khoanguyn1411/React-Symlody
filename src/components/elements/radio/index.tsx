import React from "react";

type TProps = {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
};

export const Radio: React.FC<TProps> = ({ label, defaultChecked, checked }) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex items-center p-3 overflow-hidden rounded-full cursor-pointer"
        htmlFor="radio"
      >
        <input
          type="radio"
          name="has"
          defaultChecked={defaultChecked}
          checked={checked}
          className="relative w-5 h-5 border rounded-full appearance-none cursor-pointer text-primary-800 peer border-blue-grey-200 transition-all before:content[''] before:block before:bg-blue-grey-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:border-primary-800 checked:before:bg-primary-800"
          id="radio"
        ></input>
        <div className="absolute opacity-0 pointer-events-none text-primary-800 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </div>
      </label>
      <label className="text-black cursor-pointer select-none" htmlFor="radio">
        {label}
      </label>
    </div>
  );
};
