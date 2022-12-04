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
  filterPropertyBySearch,
  getPropertyAsync,
  paginatePropertyAsync,
  propertySelectors,
  setFilterParamsProperty,
} from "@/features/reducers/property-reducer";
import { Property, Roles, RolesID } from "@/features/types";
import { withPermission } from "@/hoc";
import { useDebounce, useModal } from "@/hooks";

import {
  PROPERTY_FILTER_OPTIONS,
  PROPERTY_FILTER_VALUE,
  PROPERTY_MESSAGE,
  PROPERTY_NO_DATA_CONFIG,
} from "./constant";
import { ModalCreateProperty, ModalEditProperty } from "./property-modal";
import { PropertyPagination } from "./property-pagination";
import { PropertyTableContent } from "./property-table-content";

const getFilterValue = (key: string) => {
  return PROPERTY_FILTER_OPTIONS.find((item) => item.key === key).value;
};

export const PropertyContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const propertyStore = useAppSelector((state) => state.property);
  const propertyList = useAppSelector(propertySelectors.selectAll);
  const currentUser = useAppSelector((state) => state.auth.user);

  const propsModal = useModal({ isHotkeyOpen: true });
  const propsModalEdit = useModal<Property>();
  const propsSearch = useDebounce(propertyStore.filterParamsProperty.search);

  const isPropertyManager = currentUser.isRole([
    Roles.Lead,
    Roles.PropertyManager,
  ]);

  const hasPermission = withPermission([RolesID.PropertyManager, RolesID.Lead]);

  const [filter, setFilter] = useState<string>(() => {
    switch (propertyStore.filterParamsProperty.isArchived) {
      case true:
        return getFilterValue(PROPERTY_FILTER_VALUE.isArchived);
      case false:
        return getFilterValue(PROPERTY_FILTER_VALUE.inUse);
      case null:
        return getFilterValue(PROPERTY_FILTER_VALUE.all);
    }
  });

  const handleSetFilter = (item: TItemListSelect) => {
    switch (item.key) {
      case PROPERTY_FILTER_VALUE.all:
        dispatch(setFilterParamsProperty({ isArchived: null }));
        break;
      case PROPERTY_FILTER_VALUE.isArchived:
        dispatch(setFilterParamsProperty({ isArchived: true }));
        break;
      case PROPERTY_FILTER_VALUE.inUse:
        dispatch(setFilterParamsProperty({ isArchived: false }));
        break;
    }
  };

  const handleEdit = (item: Property) => {
    propsModalEdit.setData(item);
    propsModalEdit.toggle.setToggle();
  };

  const handleDelete = hasPermission(async (item: Property) => {
    const result = await dispatch(deletePropertyAsync(item.id));
    if (result.payload) {
      toast.success(PROPERTY_MESSAGE.delete.success);
      return;
    }
    toast.success(PROPERTY_MESSAGE.delete.error);
  });

  const handleRestore = () => {
    //TODO: Handle restore property.
  };

  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };

  useEffect(() => {
    dispatch(getPropertyAsync(propertyStore.filterParamsProperty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, propertyStore.filterParamsProperty.isArchived]);

  useEffect(() => {
    dispatch(filterPropertyBySearch(propsSearch.debounceValue));
  }, [dispatch, propsSearch.debounceValue, propertyList]);

  useEffect(() => {
    dispatch(paginatePropertyAsync());
  }, [
    dispatch,
    propertyStore.filterParamsProperty.page,
    propertyStore.filterParamsProperty.limit,
    propertyStore.currentPropertyList,
  ]);

  const isNodata = false;
  if (isNodata) {
    return (
      <>
        <NoData
          data={PROPERTY_NO_DATA_CONFIG}
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
          {isPropertyManager && (
            <ButtonCreate onClick={handleOpenModal}>Thêm tài sản</ButtonCreate>
          )}
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
          <PropertyTableContent
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
