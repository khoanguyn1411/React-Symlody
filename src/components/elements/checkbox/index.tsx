import React from "react";

type TProps = {
  checked: boolean;
  readOnly?: boolean;
};

export const Checkbox: React.FC<TProps> = ({ checked, readOnly = false }) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex items-center p-2 rounded-full cursor-pointer"
        htmlFor="checkbox"
      >
        <input
          readOnly
          checked={checked}
          disabled={readOnly}
          type={"checkbox"}
          id={"checkbox"}
          className="relative w-5 h-5 border appearance-none cursor-pointer peer rounded-md border-blue-grey-200 transition-all before:content[''] before:block before:bg-blue-grey-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-primary-800 checked:border-primary-800 checked:before:bg-primary-800"
        />
        <div className="absolute text-white opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
    </div>
  );
};
