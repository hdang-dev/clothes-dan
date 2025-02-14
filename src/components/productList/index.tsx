import { Grid } from "@radix-ui/themes";
import { ProductCard } from "../productCard";
import { IProduct } from "@/interfaces";

export function ProductList({ products }: { products: IProduct[]; }) {
  return (
    <Grid width="100%" height='max-content' columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
      {products.map(product => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </Grid>
  );
}
