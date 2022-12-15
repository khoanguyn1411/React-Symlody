import { useState } from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import { Primitive } from "@/utils/types";

import { Select } from "../../select";
import { TOptionProps } from "../../select/type";
import { MONTH_LIST, YEAR_LIST } from "../constant";

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
