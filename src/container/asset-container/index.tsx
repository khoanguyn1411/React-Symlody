import { Dropdown, DropDownWithAction } from "@/components";
import { useModal } from "@/hooks";
import { formatCurrency } from "@/utils/format";

import { ModalCreateAsset } from "./asset-modal";

export const AssetContainer: React.FC = () => {
  const useModalProps = useModal();
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
      name: "VOUCHER TRÀ SỮA ĐÔNG DU 50% ",
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
    useModalProps.setToggle();
  };
  const handleClickOnItemMenu = (key: string) => {
    switch (key) {
      case "Thêm tài sản":
        handleOpenModal();
        break;
      case "Thêm nhiều tài sản":
        // code block
        break;
      default:
        handleOpenModal();
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <h1>Quản lý thành viên</h1>
        <div className="flex items-center justify-center">
          <DropDownWithAction
            menus={[
              {
                key: "Thêm tài sản",
              },
              {
                key: "Thêm nhiều tài sản",
              },
            ]}
            onClickButton={handleOpenModal}
            hiddenAfterClick
            onClickMenu={(key) => handleClickOnItemMenu(key)}
          ></DropDownWithAction>
        </div>
      </div>
      <div className="p-default">
        <div className="mt-3 bg-white rounded-lg">
          <table className="w-full">
            <tbody>
              <tr className="bg-secondary-50">
                <td className="w-20 py-2 font-semibold text-center">STT</td>
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
                <td className="py-2 font-semibold text-left pr-default"></td>
              </tr>
              {assetList.map((item, index) => (
                <tr className="text-left border-t border-gray-200" key={index}>
                  <td className="w-20 py-2 font-normal text-center">
                    {index + 1}
                  </td>

                  <td className="w-1/4 py-2 font-normal">{item.name}</td>
                  <td className="py-2 font-normal text-center">
                    {item.quantity}
                  </td>
                  <td className="py-2 font-normal text-center w-44">
                    {formatCurrency(item.price)}/cái
                  </td>

                  <td className="w-56 py-2 font-normal text-center pr-default">
                    {item.inCharge}
                  </td>
                  <td className="w-32 py-2 font-normal text-center pr-default">
                    {item.owner}
                  </td>

                  <td className="w-6 py-2 font-normal pr-default">
                    <Dropdown
                      menus={[
                        {
                          key: "Chỉnh sửa tài sản",
                          prefix: <i className="w-6 far fa-edit"></i>,
                        },
                        {
                          key: "Lưu trữ tài sản",
                          prefix: <i className="w-6 far fa-trash-alt"></i>,
                        },
                      ]}
                      onClickMenu={function (key: string): void {
                        console.log(key);
                      }}
                    >
                      <span className="text-primary-800">
                        <i className="fas fa-ellipsis-h"></i>
                      </span>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCreateAsset {...useModalProps} />
    </div>
  );
};
