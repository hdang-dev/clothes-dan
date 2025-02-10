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
  sku: string;
  name: string;
  imageSrc: string;
  category: EProductCategory;
  price: number;
  sizes: EProductSize[];
  tone: EProductTone;
}
