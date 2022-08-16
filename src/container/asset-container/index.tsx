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
    propsModalEdit.toggle.setToggle();
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
      price: "1230000",
      inCharge: "Nguyễn Thị A",
      owner: "Câu lạc bộ",
    },
  ];
  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3 bg-white border-b border-gray-200 px-default">
        <div className="flex items-center flex-1">
          <h1 className="mr-4 font-bold min-w-max">QUẢN LÝ TÀI SẢN</h1>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Search placeholder="Tìm kiếm ..." {...propsSearch} />

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
          ></Sort>
          <Button
            onClick={handleOpenModal}
            prefix={<i className="mr-2 fas fa-plus-circle" />}
          >
            Thêm tài sản
          </Button>
        </div>
      </div>
      <div className="p-default">
        <div className="bg-white">
          <table className="w-full">
            {/* <AssetSkeleton /> */}
            <thead>
              <tr className="bg-secondary-50">
                <td className="w-20 px-5 py-2 font-medium text-center">STT</td>
                <td className="py-2 font-medium text-left min-w-[200px]">
                  Tài sản
                </td>
                <td className="px-5 py-2 font-medium text-right w-28">
                  Số lượng
                </td>
                <td className="w-24 py-2 font-medium text-right">Đơn giá</td>
                <td className="w-56 px-5 py-2 font-medium text-left">
                  Người chịu trách nhiệm
                </td>
                <td className="w-32 py-2 font-medium text-left">Chủ sở hữu</td>
                <td className="w-20 px-5 py-2 font-normal"></td>
              </tr>
            </thead>
            <tbody>
              {assetList.map((item, index) => (
                <tr className="text-left border-b border-gray-200" key={index}>
                  <td className="w-20 px-5 py-2 font-normal text-center">
                    {index + 1}
                  </td>

                  <td className="py-2 font-normal min-w-[200px]">
                    {item.assetName}
                  </td>
                  <td className="px-5 py-2 font-normal text-right w-28">
                    {item.quantity}
                  </td>
                  <td className="w-24 py-2 font-normal text-right">
                    {item.price
                      ? `${FormatService.toCurrency(Number(item.price))}`
                      : "--"}
                  </td>

                  <td className="w-56 px-5 py-2 font-normal text-left">
                    {item.inCharge}
                  </td>
                  <td className="w-32 py-2 font-normal text-left">
                    {item.owner}
                  </td>

                  <td className="w-20 px-5 py-2 font-normal">
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
