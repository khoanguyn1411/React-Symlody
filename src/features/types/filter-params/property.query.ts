type _TPropertyParamQueryDto = {
  is_archived: boolean;
  page: number;
  limit: number;
  search: string;
};

export type TPropertyParamQueryDto = Partial<_TPropertyParamQueryDto>;
