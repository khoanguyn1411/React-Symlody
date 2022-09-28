export type IFormPropertyInfo = {
  readonly assetName: string;
  readonly quantity: string;
  readonly price: string;
  readonly inCharge: string;
  readonly inChargeId?: number;
  readonly note?: string;
  readonly owner: string;
  readonly image?: File;
  readonly imageLink?: string;
};

export type IPropertyTable = {
  readonly assetName: string;
  readonly quantity: string;
  readonly price: string;
  readonly inCharge: string;
  readonly owner: string;
};
