import { useEffect } from "react";

import { ButtonCreate, Container, NoData, Search, Table } from "@/components";
import { useAppDispatch } from "@/features";
import { getPropertyAsync } from "@/features/reducers/property-reducer";
import { useModal, useSearch } from "@/hooks";

import { ModalCreateAsset, ModalEditAsset } from "./asset-modal";
import { TableAssetContent } from "./asset-table-content";
import { ASSET_NO_DATA_CONFIG } from "./constant";
import { TFormAssetInfo } from "./type";

export const AssetContainer: React.FC = () => {
  const propsModal = useModal({ isHotkeyOpen: true });
  const propsModalEdit = useModal<TFormAssetInfo>();
  const propsSearch = useSearch();
  const dispatch = useAppDispatch();

  const handleEdit = (item: any) => {
    propsModalEdit.setData(item);
    propsModalEdit.toggle.setToggle();
  };
  const handleDelete = (item: any) => {
    alert("Deleted");
  };

  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };

  useEffect(() => {
    dispatch(getPropertyAsync());
  }, []);

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
        <Table.Container defaultSortActive="name" defaultOrderActive="asc">
          <Table.Head>
            <Table.CellHead isFirst textAlign="center" width="5rem">
              STT
            </Table.CellHead>
            <Table.CellHead isSort keySorting="name">
              Tài sản
            </Table.CellHead>
            <Table.CellHead
              isSort
              keySorting="quantity"
              width="7rem"
              textAlign="right"
            >
              Số lượng
            </Table.CellHead>
            <Table.CellHead
              keySorting="price"
              isSort
              width="6rem"
              textAlign="right"
            >
              Đơn giá
            </Table.CellHead>
            <Table.CellHead width="14rem">
              Người chịu trách nhiệm
            </Table.CellHead>
            <Table.CellHead width="11rem">Chủ sở hữu</Table.CellHead>
            <Table.CellHeadAction />
          </Table.Head>
          <TableAssetContent onEdit={handleEdit} onDelete={handleDelete} />
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
