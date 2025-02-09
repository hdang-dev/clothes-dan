import { EProductTone } from "./interfaces";

export const formatPrice = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(value);
};

export const colorTone = (tone: EProductTone): string => {
  switch (tone) {
    case EProductTone.WHITE:
      return "white";
    case EProductTone.BLACK:
      return "black";
    case EProductTone.GRAY:
      return "gray";
    case EProductTone.WARM:
      return "red";
    case EProductTone.COOL:
      return "blue";
    default:
      return "black";
  }
};
