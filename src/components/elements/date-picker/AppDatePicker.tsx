import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
import classNames from "classnames";
import React, { useState } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import { Icon } from "@/assets/icons";
import { FormatService } from "@/utils";
import { Primitive } from "@/utils/types";

import { ANIMATION_DEFAULT_TIME } from "../animation-custom/constants";
import { Portal } from "../portal";
import { Select } from "../select";
import { TOptionProps } from "../select/type";
import { MONTH_LIST, WEEK_DAY_ENG, YEAR_LIST } from "./constant";
import { STYLE_MAP } from "./type";

type TProps = {
  style?: "modal" | "default";
  value: string;
  isTimePicker?: boolean;
  onChange: (param: Date) => void;
  isDefault1990?: boolean;
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
  isDefault1990 = false,
  onChange,
}) => {
  const handleChangeDate = (date: Date): void => {
    _setValue(value);
    onChange(date);
  };

  const [_value, _setValue] = useState(() => {
    if (isDefault1990) {
      return !value ? "" : FormatService.toDateString(value, "VN");
    }
    return value && FormatService.toDateString(value, "VN");
  });

  const getSelectedDate = () => {
    if (isDefault1990) {
      return !value ? new Date("01/01/1990") : new Date(value);
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
        formatWeekDay={(weekDay) => {
          return (
            <h1 className="mt-2 font-semibold">{WEEK_DAY_ENG[weekDay]}</h1>
          );
        }}
        onChange={handleChangeDate}
        placeholderText={!isTimePicker ? "DD/MM/YYYY" : "DD/MM/YYYY hh:mm aa"}
        portalId="portal-date"
        popperClassName="!z-30"
        value={_value}
        popperPlacement="top-end"
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

export const AppDatePickerHeaderCustom: React.FC<
  ReactDatePickerCustomHeaderProps
> = (param) => {
  const [selectedMonth, setSelectedMonth] = useState<
    TOptionProps<undefined, Primitive>
  >(() => ({
    value: param.date.getMonth() + 1,
    label: MONTH_LIST.find((month) => month.value === param.date.getMonth() + 1)
      .label,
  }));

  const [selectedYear, setSelectedYear] = useState<
    TOptionProps<undefined, Primitive>
  >(() => ({
    value: param.date.getFullYear(),
    label: YEAR_LIST.find((year) => year.value === param.date.getFullYear())
      .label,
  }));

  const handleChangeMonth = (option: TOptionProps<undefined, Primitive>) => {
    setSelectedMonth(option);
    param.changeMonth(Number(option.value) - 1);
  };

  const handleChangeYear = (option: TOptionProps<undefined, Primitive>) => {
    setSelectedYear(option);
    param.changeYear(Number(option.value));
  };

  return (
    <div className="flex px-3 gap-3">
      <div className="flex-1">
        <Select
          list={MONTH_LIST}
          isPortal={false}
          selectValueControlled={selectedMonth}
          setSelectValueControlled={handleChangeMonth}
        />
      </div>
      <div className="flex-1">
        <Select
          isPortal={false}
          list={YEAR_LIST}
          selectValueControlled={selectedYear}
          setSelectValueControlled={handleChangeYear}
        />
      </div>
    </div>
  );
};
