'use client';

import { Flex, Spinner } from "@radix-ui/themes";
import { Filters, ProductList } from "@/components";
import { FILTERS, PRODUCTS } from "@/mock";
import { TFilter, IProduct } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { fakeRequest } from "@/utils";
import { debounce } from 'lodash';

export default function Home() {
  const filtersQuery = useQuery({ queryKey: ['filters'], queryFn: () => getFilters() });
  const productQuery = useQuery({ queryKey: ['products'], queryFn: () => getProducts() });


  const getFilters = () => {
    return fakeRequest<TFilter[]>(FILTERS);
  };

  const getProducts = () => {
    console.log('fetch products');

    return fakeRequest<IProduct[]>(PRODUCTS);
  };

  const changeFilters = (change: TFilter) => {
    console.log(123, change);
  };

  const debounceChangeFilters = (change: TFilter) => {
    console.log(123321);

    debounce(() => {
      console.log(123, change);
    }, 500);
  };

  return (
    <>
      {(filtersQuery.isLoading || productQuery.isLoading) && <Spinner size="3" />}
      {filtersQuery.data && productQuery.data && (
        <Flex width="100%" pt="30px" gap="8">
          <Filters items={FILTERS} onChange={(change) => {
            debounceChangeFilters(change);
          }} />
          <ProductList products={productQuery.data} />
        </Flex>
      )}
    </>
  );
}
