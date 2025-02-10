export enum EFilterKey {
    CATEGORY = 'Category',
    PRICE = 'Price',
    SIZE = 'Size',
    TONE = 'Tone'
}

interface ICheckboxGroupFilter {
    key: EFilterKey;
    type: "checkbox-group";
    items: string[];
}

interface IRangeFilter {
    key: EFilterKey;
    type: "range";
    min: number;
    max: number;
}

export type TFilter = ICheckboxGroupFilter | IRangeFilter;