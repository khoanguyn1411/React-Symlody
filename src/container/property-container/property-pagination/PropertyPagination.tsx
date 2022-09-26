import { memo, useCallback } from "react";

import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationProperty, propertySelectors } from "@/features/reducers";

export const _PropertyPagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const propertyCount = useAppSelector(propertySelectors.selectTotal);
  const propertyList = useAppSelector(propertySelectors.selectAll);

  const handlePaginationChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationProperty({
          propertyList,
          page,
          limit,
        })
      );
    },
    [dispatch, propertyList]
  );
  const handleResetPagination = useCallback(
    (limit: number) => {
      dispatch(
        getPaginationProperty({
          propertyList,
          page: 1,
          limit,
        })
      );
    },
    [dispatch, propertyList]
  );
  const handleLimitChange = useCallback(
    (page: number, limit: number) => {
      dispatch(
        getPaginationProperty({
          propertyList,
          page: 1,
          limit,
        })
      );
    },
    [dispatch, propertyList]
  );

  return (
    <Container.Pagination
      count={propertyCount}
      onResetPagination={{
        changeListener: [propertyList],
        callback: handleResetPagination,
      }}
      onLimitChange={handleLimitChange}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export const PropertyPagination = memo(_PropertyPagination);
