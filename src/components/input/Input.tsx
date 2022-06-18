import { FunctionComponent } from "react";

type TProps = {
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

export const Input: FunctionComponent<TProps> = ({
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 mt-2 border-[1.5px] border-primary-grey rounded-md"
    />
  );
};
