import { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  ButtonCreate,
  Container,
  NoData,
  Search,
  Select,
  Table,
  TItemListSelect,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  deletePropertyAsync,
  getPropertyAsync,
  propertySelector,
  setListQueryProperty,
} from "@/features/reducers/property-reducer";
import { IProperty } from "@/features/types";
import { useDebounce, useModal } from "@/hooks";

import {
  ASSET_NO_DATA_CONFIG,
  PROPERTY_FILTER_OPTIONS,
  PROPERTY_FILTER_VALUE,
  PROPERTY_MESSAGE,
} from "./constant";
import { ModalCreateProperty, ModalEditProperty } from "./property-modal";
import { TablePropertyContent } from "./property-table-content";

const getFilterValue = (key: string) => {
  return PROPERTY_FILTER_OPTIONS.find((item) => item.key === key).value;
};

const _PropertyContainer: React.FC = () => {
  const propsModal = useModal({ isHotkeyOpen: true });
  const propsModalEdit = useModal<IProperty>();
  const propsSearch = useDebounce();
  const dispatch = useAppDispatch();

  const propertyCount = useAppSelector(propertySelector.selectTotal);
  const propertyStore = useAppSelector((state) => state.property);

  const [filter, setFilter] = useState<string>(() => {
    switch (propertyStore.listQueryProperty.is_archived) {
      case true:
        return getFilterValue(PROPERTY_FILTER_VALUE.isArchived);
      case false:
        return getFilterValue(PROPERTY_FILTER_VALUE.inUse);
      case undefined:
        return getFilterValue(PROPERTY_FILTER_VALUE.all);
    }
  });

  const handleSetFilter = useCallback(
    (item: TItemListSelect) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { is_archived, ...rest } = propertyStore.listQueryProperty;
      switch (item.key) {
        case PROPERTY_FILTER_VALUE.all:
          dispatch(setListQueryProperty(rest));
          break;
        case PROPERTY_FILTER_VALUE.isArchived:
          dispatch(setListQueryProperty({ ...rest, is_archived: true }));
          break;
        case PROPERTY_FILTER_VALUE.inUse:
          dispatch(setListQueryProperty({ ...rest, is_archived: false }));
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );
  const handleEdit = (item: IProperty) => {
    propsModalEdit.setData(item);
    propsModalEdit.toggle.setToggle();
  };
  const handleDelete = async (item: IProperty) => {
    const result = await dispatch(deletePropertyAsync(item.id));
    if (result.payload) {
      toast.success(PROPERTY_MESSAGE.delete.success);
      return;
    }
    toast.success(PROPERTY_MESSAGE.delete.error);
  };
  const handleRestore = (item: IProperty) => {
    console.log(item);
  };
  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };

  useEffect(() => {
    dispatch(getPropertyAsync(propertyStore.listQueryProperty));
  }, [dispatch, propertyStore.listQueryProperty]);

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
          <Select
            className="w-44"
            list={PROPERTY_FILTER_OPTIONS}
            value={filter}
            onChangeSideEffect={handleSetFilter}
            onChange={setFilter}
          />
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
            <Table.CellHead width="10rem">Chủ sở hữu</Table.CellHead>
            <Table.CellHeadAction />
          </Table.Head>
          <TablePropertyContent
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRestore={handleRestore}
          />
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

export const PropertyContainer = memo(_PropertyContainer);
