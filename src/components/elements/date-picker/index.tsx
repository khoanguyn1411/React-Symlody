import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
import classNames from "classnames";
import React from "react";
import DatePicker from "react-datepicker";

import { STYLE_MAP } from "./type";

type TProps = {
  style?: "modal" | "default";
  value: string;
  onChange: (param: Date) => void;
};

const WrapperModule = styled.div`
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
  .react-datepicker__navigation-icon {
    margin-top: 25px;
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

  const handleChangeDate = (date: Date) => {
    onChange(date);
  };

  return (
    <WrapperModule className="relative">
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={value && new Date(value)}
        minDate={new Date("01/01/2000")}
        maxDate={getMaxDate()}
        onChange={handleChangeDate}
        placeholderText="dd/mm/yyyy"
        className={classNames(
          "w-full p-2 border-gray-200 pr-8 text-black outline-none rounded-md",
          STYLE_MAP[style]
        )}
        dayClassName={() => {
          return "transition-all duration-100";
        }}
        calendarClassName="transition-all animate__animated animate__fadeIn"
      />
      <div className="absolute top-0 bottom-0 right-0 flex items-center mr-2 text-black pointer-events-none">
        <span>
          <i className="fas fa-calendar-day"></i>
        </span>
      </div>
    </WrapperModule>
  );
};
