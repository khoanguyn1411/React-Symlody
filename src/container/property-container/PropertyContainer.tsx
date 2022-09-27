import { useEffect, useState } from "react";
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
  getPaginationProperty,
  getPropertyAsync,
  propertySelectors,
  setListQueryProperty,
} from "@/features/reducers/property-reducer";
import { IProperty } from "@/features/types";
import { useDebounce, useEffectSkipFirstRender, useModal } from "@/hooks";

import {
  ASSET_NO_DATA_CONFIG,
  PROPERTY_FILTER_OPTIONS,
  PROPERTY_FILTER_VALUE,
  PROPERTY_MESSAGE,
} from "./constant";
import { ModalCreateProperty, ModalEditProperty } from "./property-modal";
import { PropertyPagination } from "./property-pagination";
import { TablePropertyContent } from "./property-table-content";

const getFilterValue = (key: string) => {
  return PROPERTY_FILTER_OPTIONS.find((item) => item.key === key).value;
};

export const PropertyContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const propertyStore = useAppSelector((state) => state.property);
  const propertyList = useAppSelector(propertySelectors.selectAll);

  const propsModal = useModal({ isHotkeyOpen: true });
  const propsModalEdit = useModal<IProperty>();
  const propsSearch = useDebounce(propertyStore.listQueryPropertyFE.search);

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

  const handleSetFilter = (item: TItemListSelect) => {
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
  };

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

  const handleRestore = () => {
    //TODO: Handle restore property.
  };

  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };

  useEffect(() => {
    dispatch(getPropertyAsync(propertyStore.listQueryProperty));
  }, [dispatch, propertyStore.listQueryProperty]);

  // TO_UPDATE: When BE release pagination.
  useEffectSkipFirstRender(() => {
    dispatch(
      getPaginationProperty({
        propertyList,
        search: propsSearch.debounceValue,
      })
    );
  }, [propsSearch.debounceValue]);

  useEffect(() => {
    dispatch(
      getPaginationProperty({
        propertyList,
      })
    );
  }, [dispatch, propertyList]);

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
        <Table.Container defaultOrderActive="asc">
          <Table.Head>
            <Table.CellHead isFirst textAlign="center" width="5rem">
              STT
            </Table.CellHead>
            <Table.CellHead keySorting="name">Tài sản</Table.CellHead>
            <Table.CellHead
              keySorting="quantity"
              width="7rem"
              textAlign="right"
            >
              Số lượng
            </Table.CellHead>
            <Table.CellHead keySorting="price" width="6rem" textAlign="right">
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
        <PropertyPagination />
      </Container.Body>
      <ModalCreateProperty {...propsModal} />
      <ModalEditProperty {...propsModalEdit} />
    </>
  );
};
