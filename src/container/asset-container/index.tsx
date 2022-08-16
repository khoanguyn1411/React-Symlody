import {
  Button,
  DeleteAndEditField,
  Pagination,
  Search,
  Sort,
} from "@/components";
import { useModal, useSearch } from "@/hooks";
import { FormatService } from "@/utils";

import { ModalCreateAsset } from "./asset-modal";
import { ModalEditAsset } from "./asset-modal/edit-asset";
import { TFormAssetInfo } from "./type";

export const AssetContainer: React.FC = () => {
  const propsModal = useModal();
  const propsModalEdit = useModal<TFormAssetInfo>();
  const propsSearch = useSearch();

  const handleEdit = (item) => () => {
    propsModalEdit.setData(item);
    propsModalEdit.setShow();
  };
  const handleDelete = (item) => () => {
    alert("Deleted");
  };

  const assetList: TFormAssetInfo[] = [
    {
      assetName: "Lamborghini",
      quantity: "30",
      price: "",
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      assetName: "Voi 9 ngà",
      quantity: "30",
      price: "120000",
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      assetName: "Gà chín cựa ",
      quantity: "30",
      price: "120000",
      inCharge: "Nguyễn Thị A",
      owner: "Khoa Nguyen",
    },
    {
      assetName: "Ngựa chín sừng heo",
      quantity: "30",
      price: "120000",
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
    {
      assetName: "Mặt trăng",
      quantity: "30",
      price: "1230",
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
        <div className="flex items-center flex-1">
          <h1 className="mr-4 font-bold min-w-max">QUẢN LÝ TÀI SẢN</h1>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Search placeholder="Voucher, gấu bông,..." {...propsSearch} />

          <Sort
            onSortChange={(sortValue) => console.log(sortValue)}
            fields={[
              {
                title: "Tên tài sản",
                prefix: <i>A</i>,
                children: [
                  {
                    title: "A-Z",
                    isAscending: true,
                  },
                  {
                    title: "Z-A",
                    isAscending: false,
                  },
                ],
              },
              {
                title: "Số lượng",
                prefix: <i>1</i>,
                children: [
                  { title: "Nhỏ - lớn", isAscending: true },
                  { title: "Lớn - nhỏ", isAscending: false },
                ],
              },
              {
                title: "Đơn giá",
                prefix: <i className="far fa-money-bill-wave"></i>,
                children: [
                  { title: "Thấp - cao", isAscending: true },
                  { title: "Cao - thấp", isAscending: false },
                ],
              },
            ]}
          />
          <Button
            prefix={<i className="mr-2 fas fa-plus-circle" />}
            onClick={handleOpenModal}
          >
            Thêm tài sản
          </Button>
        </div>
      </div>
      <div className="p-default">
        <div className="bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary-50">
                <th className="w-20 px-2 py-2 font-semibold text-center">
                  STT
                </th>
                <th className="py-2 font-semibold text-center min-w-[200px]">
                  Tài sản
                </th>
                <th className="w-24 px-2 py-2 font-semibold text-center">
                  Số lượng
                </th>
                <th className="w-32 py-2 font-semibold text-center">Đơn giá</th>
                <th className="px-2 py-2 font-semibold text-center w-52">
                  Người chịu trách nhiệm
                </th>
                <th className="w-32 py-2 font-semibold text-center">
                  Chủ sở hữu
                </th>
                <th className="w-20 px-2 py-2 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {/* <AssetSkeleton /> */}

              {assetList.map((item, index) => (
                <tr className="text-left border-b border-gray-200" key={index}>
                  <td className="w-20 px-2 py-2 font-normal text-center">
                    {index + 1}
                  </td>

                  <td className="py-2 font-normal min-w-[200px]">
                    {item.assetName}
                  </td>
                  <td className="w-24 px-2 py-2 font-normal text-center">
                    {item.quantity}
                  </td>
                  <td className="w-32 py-2 font-normal text-center">
                    {item.price
                      ? `${FormatService.toCurrency(Number(item.price))}/cái`
                      : "--"}
                  </td>

                  <td className="px-2 py-2 font-normal text-center w-52">
                    {item.inCharge}
                  </td>
                  <td className="w-32 py-2 font-normal text-center">
                    {item.owner}
                  </td>

                  <td className="w-20 px-2 py-2 font-normal">
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
        <div className="flex justify-end w-full mt-5">
          <Pagination
            onRowQuantityChange={(activeRows) => console.log(activeRows)}
            onPaginationChange={(activePage) => console.log(activePage)}
            totalPages={150}
            pageStep={1}
          />
        </div>
      </div>
      <ModalCreateAsset {...propsModal} />
      <ModalEditAsset {...propsModalEdit} />
    </div>
  );
};
