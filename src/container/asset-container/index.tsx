import { Button, DeleteAndEditField } from "@/components";
import { useModal } from "@/hooks";
import { formatCurrency } from "@/utils/format";

import { ModalCreateAsset } from "./asset-modal";

export const AssetContainer: React.FC = () => {
  const propsModal = useModal();
  const handleEdit = (item) => () => {
    propsModal.setData(item);
    propsModal.setShow();
  };
  const handleDelete = (item) => () => {
    alert("Deleted");
  };

  const assetList = [
    {
      name: "VOUCHER TRÀ SỮA ĐÔNG DU 50% ",
      quantity: 30,
      price: 120000,
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      name: "VOUCHER TRÀ SỮA ĐÔNG DU 50% ",
      quantity: 30,
      price: 120000,
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      name: "VOUCHER TRÀ SỮA ĐÔNG DU 50% ",
      quantity: 30,
      price: 120000,
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      name: "VOUCHER TRÀ asdas dasd asd asd asd asd asd asd asd asd asd  SỮA ĐÔNG DU 50% ",
      quantity: 30,
      price: 120000,
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      name: "VOUCHER TRÀ SỮA ĐÔNG DU 50% asd asda asd as asd asd asd asd asd asd  ",
      quantity: 30,
      price: 120000,
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      name: "VOUCHER TRÀ SỮA ĐÔNG DU 50% ",
      quantity: 30,
      price: 120000,
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      name: "VOUCHER TRÀ SỮA ĐÔNG ",
      quantity: 30,
      price: 120000,
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
  ];
  const handleOpenModal = () => {
    propsModal.setToggle();
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <h1>Quản lý tài sản</h1>
        <div className="flex items-center justify-center">
          <Button onClick={handleOpenModal}>Thêm tài sản</Button>
        </div>
      </div>
      <div className="p-default">
        <div className="mt-3 bg-white rounded-lg">
          <table className="w-full">
            <tbody>
              <tr className="bg-secondary-50">
                <td className="w-20 py-2 pl-2 font-semibold text-center rounded-tl-lg">
                  STT
                </td>
                <td className="py-2 pr-6 font-semibold text-center">Tài sản</td>
                <td className="py-2 font-semibold text-center w-fit">
                  Số lượng
                </td>
                <td className="py-2 font-semibold text-center">Đơn giá</td>
                <td className="py-2 font-semibold text-center pr-default">
                  Người chịu trách nhiệm
                </td>
                <td className="py-2 font-semibold text-center pr-default">
                  Chủ sở hữu
                </td>
                <td className="py-2 font-semibold text-left rounded-tr-lg pr-default"></td>
              </tr>
              {assetList.map((item, index) => (
                <tr className="text-left border-t border-gray-200" key={index}>
                  <td className="w-20 py-2 pl-2 font-normal text-center">
                    {index + 1}
                  </td>

                  <td className="py-2 font-normal min-w-[200px]">
                    {item.name}
                  </td>
                  <td className="w-20 py-2 font-normal text-center">
                    {item.quantity}
                  </td>
                  <td className="w-32 px-2 py-2 font-normal text-center">
                    {formatCurrency(item.price)}/cái
                  </td>

                  <td className="py-2 font-normal text-center w-52 pr-default">
                    {item.inCharge}
                  </td>
                  <td className="w-32 py-2 font-normal text-center pr-default">
                    {item.owner}
                  </td>

                  <td className="w-6 py-2 font-normal pr-default">
                    <DeleteAndEditField
                      title="Xóa tài sản?"
                      handleEvent={{
                        edit: handleEdit(item),
                        delete: handleDelete(item),
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCreateAsset {...propsModal} />
    </div>
  );
};
