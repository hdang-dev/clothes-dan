import { Flex, Grid, Select, Text } from "@radix-ui/themes";
import { ProductCard } from "../productCard";
import { ESortType, IProduct } from "@/interfaces";
import { useEffect, useState } from "react";

const sortedProducts = (products: IProduct[], sortType: ESortType): IProduct[] => {
  if (sortType === ESortType.LOW_TO_HIGH) {
    return products.sort((prev, next) => prev.price > next.price ? 1 : -1);
  }
  return products.sort((prev, next) => prev.price > next.price ? -1 : 1);
};

export function ProductList({ products, reset }: { products: IProduct[]; reset: number; }) {
  const [sortType, setSortType] = useState<ESortType>(ESortType.LOW_TO_HIGH);

  const changeSortType = (sortType: ESortType) => {
    setSortType(sortType);
  };

  useEffect(() => {
    setSortType(ESortType.LOW_TO_HIGH);
  }, [reset]);

  return (
    <>
      {products.length > 0 ? (
        <>
          <Flex width="100%" justify="between">
            <Text>Found {products.length} product(s)</Text>
            <Select.Root size="2" value={sortType} onValueChange={value => changeSortType(value as ESortType)}>
              <Select.Trigger />
              <Select.Content>
                {Object.values(ESortType).map(sortType => (
                  <Select.Item key={sortType} value={sortType}>{sortType}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
          <Grid width="100%" height='max-content' columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
            {sortedProducts(products, sortType).map(product => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </Grid>
        </>
      ) : (
        <Text>No product matches</Text>
      )}
    </>
  );
}
