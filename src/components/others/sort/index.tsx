import React, { useState } from "react";

import { DropdownGeneral } from "@/components/elements/dropdown/dropdown-components";

type TField = {
  title: string;
  children: string[];
};

type TProps = {
  fields: TField[];
};

export const Sort: React.FC<TProps> = () => {
  const [isShowContent, setIsShowContent] = useState(false);
  return (
    <DropdownGeneral
      display={"Sắp xếp"}
      isShowContent={false}
      setIsShowContent={setIsShowContent}
    >
      <div>Demo</div>
    </DropdownGeneral>
  );
};
