'use client';

import { Flex, Select, Spinner, Text } from "@radix-ui/themes";
import { Filters, ProductList } from "@/components";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ESortType, IProduct } from "@/interfaces";

export default function Home() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  // const [products, setProducts] = useState<IProduct[]>();
  const [sortType, setSortType] = useState<ESortType>(ESortType.LOW_TO_HIGH);

  const { data: products } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: () => fetch('api/products?' + searchParams.toString()).then(data => data.json())
  });

  const sortedProducts = (products: IProduct[], newSortType: ESortType): IProduct[] => {
    if (newSortType === ESortType.HIGH_TO_LOW) {
      return products.sort((prev, next) => prev.price > next.price ? 1 : -1);
    }
    return products.sort((prev, next) => prev.price > next.price ? -1 : 1);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient, searchParams]);

  return (
    <Flex width="100%" height="100%" pt="30px" gap="8">
      <Filters />
      <Flex flexGrow='1' direction="column" gap="3" justify={products?.length ? 'start' : 'center'} align={products?.length ? 'start' : 'center'}>
        {products ? (
          (products.length > 0) ? (
            <>
              <Flex width="100%" justify="between">
                <Text>Found {products.length} product(s)</Text>
                <Select.Root size="2" value={sortType} onValueChange={value => setSortType(value as ESortType)}>
                  <Select.Trigger />
                  <Select.Content>
                    {Object.values(ESortType).map(sortType => (
                      <Select.Item key={sortType} value={sortType}>{sortType}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
              <ProductList products={products} />
            </>
          ) : (
            <Text>No product matches</Text>
          )
        ) : (
          <Spinner size="3" />
        )}
      </Flex>
    </Flex>
  );
}
