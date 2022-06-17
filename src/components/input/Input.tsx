import { Input as InputMaterial } from "@material-tailwind/react";
import { FunctionComponent } from "react";

type TProps = {
  label?: string;
  type?: string;
  value?: string;
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
    // <InputMaterial
    //   label={label}
    //   type={type}
    //   value={value}
    //   onChange={onChange}
    //   variant="static"
    //   placeholder={placeholder}
    // />
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 mt-2 border-[1.5px] border-grey-500 rounded-md"
    />
  );
};
