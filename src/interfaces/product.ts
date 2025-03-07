export enum EProductCategory {
  HAT = 'Hat',
  SHIRT = 'Shirt',
  TROUSERS = 'Trousers',
  GLASSES = 'Glasses',
  SHOES = 'Shoes',
}

export enum EProductSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  "2XL" = "2XL",
}

export enum EProductTone {
  NEUTRAL = 'Neutral',
  COOL = 'Cool',
  WARM = 'Warm',
}

export interface IProduct {
  id: string;
  group: string;
  name: string;
  imageSrc: string;
  category: EProductCategory;
  price: number;
  size: EProductSize;
  tone: EProductTone;
}

export interface IProductGroup {
  key: string;
  count: number;
  lowestPrice: number;
  items: IProduct[];
};