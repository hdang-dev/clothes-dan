import { EProductCategory, EProductSize, EProductTone } from "../interfaces";

export const FILTERS = [
    {
        key: 'Category',
        type: "checkbox-group",
        items: Object.values(EProductCategory),
    },
    {
        key: 'Price',
        type: "range",
        min: 0,
        max: 150
    },
    {
        key: 'Size',
        type: "checkbox-group",
        items: Object.values(EProductSize),
    },
    {
        key: 'Tone',
        type: "checkbox-group",
        items: Object.values(EProductTone),
    },
];
