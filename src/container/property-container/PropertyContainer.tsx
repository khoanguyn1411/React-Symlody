import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  ButtonCreate,
  Container,
  NoData,
  Search,
  Select,
  Table,
} from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { useAppDispatch, useAppSelector } from "@/features";
import { updatePropertyAsync } from "@/features/reducers";
import {
  deletePropertyAsync,
  getPropertyAsync,
  propertySelectors,
  setPropertyFilterParams,
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
import { usePropertyPagination } from "./property-pagination/usePropertyPagination";
import { PropertyTableContent } from "./property-table-content";

const getFilterValue = (value: string) => {
  return PROPERTY_FILTER_OPTIONS.find((item) => item.value === value).value;
};

export const PropertyContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const propertyStore = useAppSelector((state) => state.property);
  const propertyList = useAppSelector(propertySelectors.selectAll);
  const currentUser = useAppSelector((state) => state.auth.user);

  const propsModal = useModal({ isHotkeyOpen: true });
  const propsModalEdit = useModal<Property>();
  const propsSearch = useDebounce(propertyStore.filterParamsProperty.search);
  const { paginate, filterBySearch } = usePropertyPagination();

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

  const handleSetFilter = (item: TOptionProps) => {
    switch (item.value) {
      case PROPERTY_FILTER_VALUE.all:
        dispatch(setPropertyFilterParams({ isArchived: null }));
        break;
      case PROPERTY_FILTER_VALUE.isArchived:
        dispatch(setPropertyFilterParams({ isArchived: true }));
        break;
      case PROPERTY_FILTER_VALUE.inUse:
        dispatch(setPropertyFilterParams({ isArchived: false }));
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

  const handleRestore = hasPermission(async (item: Property) => {
    const result = await dispatch(
      updatePropertyAsync({
        payload: {
          ...item,
          image: undefined,
          inChargerId: item.inCharger.id,
          isArchived: false,
        },
        id: item.id,
        isRestore: true,
      })
    );
    if (updatePropertyAsync.rejected.match(result)) {
      toast.error(PROPERTY_MESSAGE.update.error);
      return;
    }
    toast.success(PROPERTY_MESSAGE.update.success);
  });

  const handleOpenModal = () => {
    propsModal.toggle.setToggle();
  };

  useEffect(() => {
    dispatch(getPropertyAsync(propertyStore.filterParamsProperty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyStore.filterParamsProperty.isArchived]);

  useEffect(() => {
    filterBySearch(propsSearch.debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsSearch.debounceValue, propertyList]);

  useEffect(() => {
    paginate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
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
