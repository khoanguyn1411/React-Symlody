import React from "react";

import { Button } from "../elements";

type TProps = {
  imageSrc: string;
  title: string;
  buttonTitle: string;
  content: string;
  onCreateNew: () => void;
};

export const NoData: React.FC<TProps> = ({
  imageSrc,
  title,
  buttonTitle,
  content,
  onCreateNew,
}) => {
  return (
    <div className="flex items-center justify-center w-3/4 m-auto space-x-10 h-content">
      <div className="w-48">
        <img className="w-full" src={imageSrc} alt="no-data" />
      </div>
      <div className="flex flex-col justify-center w-96 space-y-4">
        <h1 className="text-xl font-bold uppercase">{title}</h1>
        <p>{content}</p>
        <Button
          prefix={<i className="mr-2 fas fa-plus-circle" />}
          className="w-[fit-content]"
          onClick={onCreateNew}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};
