import { EProductCategory, EProductSize, EProductTone } from "../interfaces";
import { EFilterKey, TFilter } from "../interfaces/filter";

export const FILTERS: TFilter[] = [
    {
        key: EFilterKey.CATEGORY,
        type: "checkbox-group",
        items: Object.values(EProductCategory),
    },
    {
        key: EFilterKey.PRICE,
        type: "range",
        min: 0,
        max: 100
    },
    {
        key: EFilterKey.SIZE,
        type: "checkbox-group",
        items: Object.values(EProductSize),
    },
    {
        key: EFilterKey.TONE,
        type: "checkbox-group",
        items: Object.values(EProductTone),
    },
];
