import { Grid } from "@radix-ui/themes";
import { ProductCard } from "../productCard";
import { PRODUCTS } from "./data";

export function ProductList() {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} flexGrow="1" gap="6">
      {PRODUCTS.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </Grid>
  );
}
