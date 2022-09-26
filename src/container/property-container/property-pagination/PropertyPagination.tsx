import { memo, useCallback } from "react";

import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationProperty } from "@/features/reducers";

export const _PropertyPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  // TO_UPDATE: When BE release pagination, change it to the original propertyCount:
  // const propertyCount = useAppSelector(propertySelectors.selectTotal);
  const propertyStore = useAppSelector((state) => state.property);
  const propertyCount = propertyStore.currentPropertyList.length;

  const handlePaginationChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationProperty({
          page,
          limit,
        })
      );
    },
    [dispatch]
  );
  const handleResetPagination = useCallback(
    (limit: number) => {
      dispatch(
        getPaginationProperty({
          page: 1,
          limit,
        })
      );
    },
    [dispatch]
  );
  const handleLimitChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationProperty({
          page: 1,
          limit,
        })
      );
    },
    [dispatch]
  );

  return (
    <Container.Pagination
      count={propertyCount}
      onResetPagination={{
        changeListener: [propertyStore.listQueryProperty],
        callback: handleResetPagination,
      }}
      onLimitChange={handleLimitChange}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export const PropertyPagination = memo(_PropertyPagination);
