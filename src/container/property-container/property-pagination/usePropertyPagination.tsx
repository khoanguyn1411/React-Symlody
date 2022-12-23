import { useAppDispatch, useAppSelector } from "@/features";
import {
  propertySelectors,
  setCurrentPropertyList,
  setPropertyFilterParams,
  setPropertyListWithPagination,
} from "@/features/reducers";
import { isTextIncludedIn } from "@/utils/funcs/is-text-included-in";

export const usePropertyPagination = () => {
  const dispatch = useAppDispatch();
  const propertyList = useAppSelector(propertySelectors.selectAll);
  const propertyStore = useAppSelector((state) => state.property);
  const filterBySearch = (search: string) => {
    const { currentPropertyList } = propertyStore;
    dispatch(setPropertyFilterParams({ search: search }));
    if (!search) {
      dispatch(setCurrentPropertyList(propertyList));
      return;
    }
    const newListProperty = currentPropertyList.filter((item) =>
      isTextIncludedIn(item.name, search)
    );

    dispatch(setCurrentPropertyList(newListProperty));
  };

  const paginate = () => {
    const { currentPropertyList } = propertyStore;
    const { page, limit } = propertyStore.filterParamsProperty;
    const propertyListPagination = currentPropertyList.slice(
      (page - 1) * limit,
      page * limit
    );
    dispatch(setPropertyListWithPagination(propertyListPagination));
  };

  return { paginate, filterBySearch };
};
