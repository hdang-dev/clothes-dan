import { EProductSize, IProduct } from "./product";

export type TWishList = Array<{
    product: IProduct,
    selectedSize: EProductSize,
    count: number;
}>;