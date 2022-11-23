type _TMemberParamQueryDto = {
  is_archived: boolean;
  page: number;
  limit: number;
  search: string;
};

export type TMemberParamQueryDto = Partial<_TMemberParamQueryDto>;
