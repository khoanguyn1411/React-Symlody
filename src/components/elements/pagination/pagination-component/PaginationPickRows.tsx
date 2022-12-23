import { Select } from "../../select";
import { usePaginationContext } from "../context";

export const PaginationPickRows: React.FC = () => {
  const { quantityDisplay, setConfig, config } = usePaginationContext();

  const handleRowsChange = (limit: number) => {
    setConfig({ limit });
  };

  return (
    <div className="flex items-center ml-8">
      <h1 className="mr-2 font-medium">Hiển thị: </h1>
      <Select
        className="w-32"
        classNameDisplay="h-9"
        list={quantityDisplay.map((item) => ({
          value: item,
          label: `${item} hàng`,
        }))}
        value={config.limit}
        onChange={handleRowsChange}
      />
    </div>
  );
};
