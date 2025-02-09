export enum EProductCategory {
  HAT,
  "T-SHIRT",
  JEANS,
  GLASSES,
  SHOES,
}

export enum EProductSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  "2XL" = "2XL",
}

export enum EProductTone {
  WHITE,
  BLACK,
  GRAY,
  COOL,
  WARM,
}

export interface IProduct {
  sku: string;
  name: string;
  imageSrc: string;
  category: EProductCategory;
  price: number;
  sizes: EProductSize[];
  tones: EProductTone[];
}
