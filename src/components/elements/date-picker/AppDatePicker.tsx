import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
import classNames from "classnames";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { Icon } from "@/assets/icons";
import { DateService } from "@/utils/funcs/date-service";

import { ANIMATION_DEFAULT_TIME } from "../animation-custom/constants";
import { WEEK_DAY_ENG } from "./constant";
import { AppDatePickerHeaderCustom } from "./date-picker-components/AppDatePickerHeader";
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
      return !value ? "" : DateService.toFormat(value, "VN");
    }
    return value && DateService.toFormat(value, "VN");
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
        minDate={new Date("01/01/1990")}
        maxDate={getMaxDate()}
        renderCustomHeader={(param) => {
          return <AppDatePickerHeaderCustom {...param} />;
        }}
        portalId={"portal-root"}
        formatWeekDay={(weekDay) => {
          return (
            <h1 className="mt-2 font-semibold">{WEEK_DAY_ENG[weekDay]}</h1>
          );
        }}
        popperContainer={({ children }) => (
          <WrapperModule>{children}</WrapperModule>
        )}
        onChange={handleChangeDate}
        placeholderText={!isTimePicker ? "DD/MM/YYYY" : "DD/MM/YYYY hh:mm aa"}
        popperClassName="!z-30"
        value={_value}
        popperPlacement="top-end"
        className={classNames(
          "w-full p-2 border-gray-200 focus:ring-primary-800 focus:ring-1 pr-8 text-black outline-none rounded-md",
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
