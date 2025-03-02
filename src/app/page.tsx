"use client";

import { Flex, Spinner } from "@radix-ui/themes";
import { Filters, ProductList } from "@/components";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IProduct } from "@/interfaces";

export default function Home() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { data: products } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: () => fetch("api/products?" + searchParams.toString()).then((data) => data.json()),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [queryClient, searchParams]);

  return (
    <Flex width="100%" height="100%" pt="30px" gap="8">
      {/* <Filters priceRange={{ min: MIN_PRICE, max: MAX_PRICE }} onChange={(value) => debounceChangeFilters(value)} reset={reset} /> */}
      <Filters />
      <Flex flexGrow="1" direction="column" gap="3" justify={products?.length ? "start" : "center"} align={products?.length ? "start" : "center"}>
        {products ? <ProductList products={products} /> : <Spinner size="3" />}
      </Flex>
    </Flex>
  );
}
