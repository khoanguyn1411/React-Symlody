import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
import classNames from "classnames";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addSyntheticLeadingComment } from "typescript";

import { Icon } from "@/assets/icons";
import { FormatService } from "@/utils";

import { ANIMATION_DEFAULT_TIME } from "../animation-custom/constants";
import { Portal } from "../portal";
import { STYLE_MAP } from "./type";

type TProps = {
  style?: "modal" | "default";
  value: string;
  isTimePicker?: boolean;
  onChange: (param: Date) => void;
  isDefault2000?: boolean;
};

const WrapperModule = styled.div`
  --animate-duration: ${ANIMATION_DEFAULT_TIME / 1000}s;
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
    margin-top: 15px;
  }
  .react-datepicker__time-list-item--selected {
    background-color: #007ea4 !important;
  }
`;

const getMaxDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return new Date(`${mm}/${dd}/${yyyy + 10}`);
};

export const DatePortal: React.FC = () => {
  return (
    <Portal>
      <WrapperModule id="portal-date" />
    </Portal>
  );
};

export const AppDatePicker: React.FC<TProps> = ({
  isTimePicker = false,
  style = "default",
  value,
  isDefault2000 = false,
  onChange,
}) => {
  const handleChangeDate = (date: Date): void => {
    _setValue(value);
    onChange(date);
  };

  const [_value, _setValue] = useState(() => {
    if (isDefault2000) {
      return !value ? "" : FormatService.toDateString(value, "VN");
    }
    return value && FormatService.toDateString(value, "VN");
  });

  const getSelectedDate = () => {
    if (isDefault2000) {
      return !value ? new Date("01/01/2000") : new Date(value);
    }
    return value && new Date(value);
  };

  return (
    <WrapperModule className="relative">
      <DatePicker
        dateFormat={!isTimePicker ? "dd/MM/yyyy" : "dd/MM/yyyy hh:mm aa"}
        selected={getSelectedDate()}
        minDate={new Date("01/01/2000")}
        maxDate={getMaxDate()}
        onChange={handleChangeDate}
        placeholderText={!isTimePicker ? "DD/MM/YYYY" : "DD/MM/YYYY hh:mm aa"}
        portalId="portal-date"
        popperClassName="!z-30"
        locale="vi-VN"
        value={_value}
        popperPlacement="bottom-end"
        className={classNames(
          "w-full p-2 border-gray-200 pr-8 text-black outline-none rounded-md",
          STYLE_MAP[style]
        )}
        dayClassName={() => {
          return "transition-all duration-100";
        }}
        calendarClassName="transition-all animate__animated animate__fadeIn"
        showTimeSelect={isTimePicker}
      />
      <div className="absolute top-0 bottom-0 right-0 flex items-center mr-2 pointer-events-none">
        <Icon.Calendar size="small" customColor="gray" />
      </div>
    </WrapperModule>
  );
};
