import {
  Button,
  DeleteAndEditField,
  Pagination,
  Search,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
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
          />
          <Button
            className="ml-4"
            onClick={handleOpenModal}
            prefix={<i className="mr-2 fas fa-plus-circle" />}
          >
            Thêm tài sản
          </Button>
        </div>
      </div>
      <div className="p-default">
        {/* <TableAssetSkeleton /> */}
        <Table>
          <TableHead>
            <TableCellHead isFirst textAlign="center" width="5rem">
              STT
            </TableCellHead>
            <TableCellHead>Tài sản</TableCellHead>
            <TableCellHead width="7rem" textAlign="right">
              Số lượng
            </TableCellHead>
            <TableCellHead width="6rem" textAlign="right">
              Đơn giá
            </TableCellHead>
            <TableCellHead width="14rem">Người chịu trách nhiệm</TableCellHead>
            <TableCellHead width="8rem">Chủ sở hữu</TableCellHead>
            <TableCellHead isLast width="5rem" />
          </TableHead>
          <TableBody>
            {assetList.map((item, index) => (
              <TableRow key={index}>
                <TableCell textAlign="center" width="5rem">
                  {index + 1}
                </TableCell>

                <TableCell>{item.assetName}</TableCell>
                <TableCell width="7rem" textAlign="right">
                  {item.quantity}
                </TableCell>
                <TableCell width="6rem" textAlign="right">
                  {item.price
                    ? `${FormatService.toCurrency(Number(item.price))}`
                    : "--"}
                </TableCell>

                <TableCell width="14rem">{item.inCharge}</TableCell>
                <TableCell width="8rem">{item.owner}</TableCell>

                <TableCell width="5rem">
                  <DeleteAndEditField
                    title="Xóa tài sản?"
                    handleEvent={{
                      edit: handleEdit(item),
                      delete: handleDelete(item),
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
