import { EProductCategory, EProductSize, EProductTone } from "./product";

export interface IFilter {
    categories: EProductCategory[],
    prices: {
        min: number,
        max: number;
    },
    sizes: EProductSize[],
    tones: EProductTone[],
}

export enum ESortType {
    LOW_TO_HIGH = 'Low to High',
    HIGH_TO_LOW = 'High to Low'
}