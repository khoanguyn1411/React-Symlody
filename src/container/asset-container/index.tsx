import {
  ButtonCreate,
  Container,
  DeleteAndEditField,
  NoData,
  Search,
  Table,
} from "@/components";
import { useModal, useSearch } from "@/hooks";
import { FormatService } from "@/utils";

import { ModalCreateAsset, ModalEditAsset } from "./asset-modal";
import { ASSET_NO_DATA_CONFIG, assetList } from "./constant";
import { TFormAssetInfo } from "./type";

export const AssetContainer: React.FC = () => {
  const propsModal = useModal({ isHotkeyOpen: true });
  const propsModalEdit = useModal<TFormAssetInfo>();
  const propsSearch = useSearch();

  const handleEdit = (item: TFormAssetInfo) => () => {
    propsModalEdit.setData(item);
    propsModalEdit.toggle.setToggle();
  };
  const handleDelete = (item: TFormAssetInfo) => () => {
    alert("Deleted");
  };

  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };
  const newLocal = false;
  if (newLocal) {
    return (
      <>
        <NoData
          imageSrc={ASSET_NO_DATA_CONFIG.imageSrc}
          title={ASSET_NO_DATA_CONFIG.title}
          buttonTitle={ASSET_NO_DATA_CONFIG.buttonTitle}
          content={ASSET_NO_DATA_CONFIG.content}
          onCreateNew={propsModal.toggle.setShow}
        />
        <ModalCreateAsset {...propsModal} />
      </>
    );
  }
  return (
    <>
      <Container.Header>
        <Container.Title>QUẢN LÝ TÀI SẢN</Container.Title>
        <Container.HeaderRight>
          <Search placeholder="Tìm kiếm ..." {...propsSearch} />
          <ButtonCreate onClick={handleOpenModal}>Thêm tài sản</ButtonCreate>
        </Container.HeaderRight>
      </Container.Header>
      <Container.Body>
        <Table.Container>
          <Table.Head>
            <Table.CellHead isFirst textAlign="center" width="5rem">
              STT
            </Table.CellHead>
            <Table.CellHead isSort>Tài sản</Table.CellHead>
            <Table.CellHead isSort width="7rem" textAlign="right">
              Số lượng
            </Table.CellHead>
            <Table.CellHead isSort width="6rem" textAlign="right">
              Đơn giá
            </Table.CellHead>
            <Table.CellHead width="14rem">
              Người chịu trách nhiệm
            </Table.CellHead>
            <Table.CellHead width="11rem">Chủ sở hữu</Table.CellHead>
            <Table.CellHeadAction />
          </Table.Head>
          <Table.Body>
            {assetList.map((item, index) => (
              <Table.Row key={index} index={index}>
                <Table.Cell textAlign="center" width="5rem">
                  {index + 1}
                </Table.Cell>

                <Table.Cell>{item.assetName}</Table.Cell>
                <Table.Cell width="7rem" textAlign="right">
                  {item.quantity}
                </Table.Cell>
                <Table.Cell width="6rem" textAlign="right">
                  {item.price
                    ? `${FormatService.toCurrency(Number(item.price))}`
                    : "--"}
                </Table.Cell>

                <Table.Cell width="14rem">{item.inCharge}</Table.Cell>
                <Table.Cell width="11rem">{item.owner}</Table.Cell>

                <Table.CellAction>
                  <DeleteAndEditField
                    title="Xóa tài sản?"
                    handleEvent={{
                      edit: handleEdit(item),
                      delete: handleDelete(item),
                    }}
                  />
                </Table.CellAction>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Container>
        <Container.Pagination
          onRowQuantityChange={(activeRows) => console.log(activeRows)}
          onPaginationChange={(activePage) => console.log(activePage)}
        />
      </Container.Body>
      <ModalCreateAsset {...propsModal} />
      <ModalEditAsset {...propsModalEdit} />
    </>
  );
};
