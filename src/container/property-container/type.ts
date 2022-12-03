export type IFormPropertyInfo = {
  assetName: string;
  quantity: string;
  price: string;
  inChargeId: number | null;
  note?: string;
  owner: string;
  image?: File;
  imageLink?: string;
};

export type IPropertyTable = {
  assetName: string;
  quantity: string;
  price: string;
  inCharge: string;
  owner: string;
};
