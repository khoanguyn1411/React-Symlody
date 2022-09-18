import { useEffect } from "react";

import { ButtonCreate, Container, NoData, Search, Table } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getPropertyAsync,
  propertySelector,
} from "@/features/reducers/property-reducer";
import { IProperty } from "@/features/types";
import { useModal, useSearch } from "@/hooks";

import { ASSET_NO_DATA_CONFIG } from "./constant";
import { ModalCreateProperty, ModalEditProperty } from "./property-modal";
import { TablePropertyContent } from "./property-table-content";

export const PropertyContainer: React.FC = () => {
  const propsModal = useModal({ isHotkeyOpen: true });
  const propsModalEdit = useModal<IProperty>();
  const propsSearch = useSearch();
  const dispatch = useAppDispatch();
  const propertyCount = useAppSelector(propertySelector.selectTotal);

  const handleEdit = (item: IProperty) => {
    propsModalEdit.setData(item);
    propsModalEdit.toggle.setToggle();
  };
  const handleDelete = (item: IProperty) => {
    alert("Deleted");
  };

  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };

  useEffect(() => {
    dispatch(getPropertyAsync());
  }, [dispatch]);

  const isNodata = false;
  if (isNodata) {
    return (
      <>
        <NoData
          imageSrc={ASSET_NO_DATA_CONFIG.imageSrc}
          title={ASSET_NO_DATA_CONFIG.title}
          buttonTitle={ASSET_NO_DATA_CONFIG.buttonTitle}
          content={ASSET_NO_DATA_CONFIG.content}
          onCreateNew={propsModal.toggle.setShow}
        />
        <ModalCreateProperty {...propsModal} />
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
            <Table.CellHead width="8rem">Chủ sở hữu</Table.CellHead>
            <Table.CellHeadAction />
          </Table.Head>
          <TablePropertyContent onEdit={handleEdit} onDelete={handleDelete} />
        </Table.Container>
        {propertyCount > 0 && (
          <Container.Pagination
            onRowQuantityChange={(activeRows) => console.log(activeRows)}
            onPaginationChange={(activePage) => console.log(activePage)}
          />
        )}
      </Container.Body>
      <ModalCreateProperty {...propsModal} />
      <ModalEditProperty {...propsModalEdit} />
    </>
  );
};
