import { Grid } from "@radix-ui/themes";
import { ProductCard } from "../productCard";
import { IProduct } from "@/interfaces";

export function ProductList({ products }: { products: IProduct[]; }) {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} flexGrow="1" gap="6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </Grid>
  );
}
