type FilterFields = Array<
  | {
      title: string;
      type: "checkbox-group";
      items: string[];
    }
  | {
      title: string;
      type: "range";
      min: number;
      max: number;
      step: number;
    }
>;

export const FILTER_FIELDS: FilterFields = [
  {
    title: "Category",
    type: "checkbox-group",
    items: ["Hat", "T-shirt", "Jeans", "Glasses", "Shoes"],
  },
  {
    title: "Price",
    type: "range",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    title: "Size",
    type: "checkbox-group",
    items: ["S", "M", "L", "XL", "2XL"],
  },
  {
    title: "Tone",
    type: "checkbox-group",
    items: ["White", "Black", "Gray", "Warm", "Cool"],
  },
];
