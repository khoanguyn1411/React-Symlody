import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { setListQueryProperty } from "@/features/reducers";

export const PropertyPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  // TO_UPDATE: When BE release pagination, change it to the original propertyCount:
  // const propertyCount = useAppSelector(propertySelectors.selectTotal);
  const propertyStore = useAppSelector((state) => state.property);
  const propertyCount = propertyStore.currentPropertyList.length;

  const handlePaginationChange = (page: number) => {
    dispatch(
      setListQueryProperty({
        page,
      })
    );
  };
  const handleResetPagination = () => {
    dispatch(
      setListQueryProperty({
        page: 1,
      })
    );
  };
  const handleLimitChange = (_page: number, limit: number) => {
    dispatch(
      setListQueryProperty({
        page: 1,
        limit,
      })
    );
  };

  return (
    <Container.Pagination
      count={propertyCount}
      defaultLimit={propertyStore.listQueryProperty.limit}
      onResetPagination={{
        changeListener: [
          propertyStore.listQueryProperty.isArchived,
          propertyStore.listQueryProperty.search,
        ],
        callback: handleResetPagination,
      }}
      onLimitChange={handleLimitChange}
      onPaginationChange={handlePaginationChange}
    />
  );
};
