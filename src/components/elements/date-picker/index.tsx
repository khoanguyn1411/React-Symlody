import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
import classNames from "classnames";
import React from "react";
import DatePicker from "react-datepicker";

type TProps = {
  style?: "modal" | "default";
  value: Date;
  onChange: (param: Date) => void;
};

const WrapperModule = styled.div`
  --animate-duration: 0.2s;
  .react-datepicker__navigation-icon::before {
    border-color: black;
  }
  .react-datepicker__header {
    background-color: #e2f6f8;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #007ea4;
  }
  .react-datepicker__day--today {
    background-color: #e2f6f8;
    border-radius: 5px;
    color: black;
  }
`;

export const AppDatePicker: React.FC<TProps> = ({ style, value, onChange }) => {
  const getMaxDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return new Date(`${mm}/${dd}/${yyyy + 10}`);
  };

  return (
    <WrapperModule className="relative">
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={value}
        minDate={new Date("01/01/2000")}
        maxDate={new Date(getMaxDate())}
        onChange={(date) => onChange(date)}
        placeholderText="Chọn ngày"
        className={classNames(
          "w-full p-2 mt-2 border-gray-300 text-black outline-none rounded-md",
          {
            "bg-gray-100": style === "modal",
            "border-[1.5px]": style === "default",
          }
        )}
        dayClassName={() => {
          return "transition-all duration-100";
        }}
        calendarClassName="transition-all animate__animated animate__fadeIn"
      />
      <span className="absolute top-0 right-0 mt-1 mr-2 text-black pointer-events-none translate-y-1/2 hover:cursor-pointer">
        <i className="fas fa-calendar"></i>
      </span>
    </WrapperModule>
  );
};
