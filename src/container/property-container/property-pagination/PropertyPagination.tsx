import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { setPropertyFilterParams } from "@/features/reducers";
import { CommonFilterParams } from "@/features/types/models/filter-params";

export const PropertyPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  // TO_UPDATE: When BE release pagination, change it to the original propertyCount:
  // const propertyCount = useAppSelector(propertySelectors.selectTotal);
  const propertyStore = useAppSelector((state) => state.property);
  const propertyCount = propertyStore.currentPropertyList.length;

  const handlePaginationChange = (config: CommonFilterParams.Pagination) => {
    dispatch(setPropertyFilterParams(config));
  };

  return (
    <Container.Pagination
      count={propertyCount}
      defaultLimit={propertyStore.filterParamsProperty.limit}
      onResetListeners={[
        propertyStore.filterParamsProperty.isArchived,
        propertyStore.filterParamsProperty.search,
      ]}
      onChange={handlePaginationChange}
    />
  );
};
