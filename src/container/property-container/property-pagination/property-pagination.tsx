import { useCallback } from "react";

import { Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/features";
import { getPaginationProperty, propertySelectors } from "@/features/reducers";

export const PropertyPagination: React.FC = () => {
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

  const handleResetPagination = (limit: number) => {
    dispatch(
      getPaginationProperty({
        propertyList,
        page: 1,
        limit,
      })
    );
  };

  const handleLimitChange = (page: number, limit: number) => {
    dispatch(
      getPaginationProperty({
        propertyList,
        page: 1,
        limit,
      })
    );
  };

  if (propertyCount > 0) {
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
  }
};
