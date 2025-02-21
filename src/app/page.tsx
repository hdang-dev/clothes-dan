'use client';

import { Flex, Spinner } from "@radix-ui/themes";
import { Filters, Footer, Header, ProductList } from "@/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { EProductCategory, EProductSize, EProductTone, IFilters, IProduct } from "@/interfaces";
import { debounce } from "lodash";

const MIN_PRICE = 0;
const MAX_PRICE = 150;

export default function Home() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathName = usePathname();
  const { data: products } = useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: () => fetch('api/products?' + searchParams.toString()).then(data => data.json())
  });
  const [reset, setReset] = useState(0);

  const debounceChangeSearchText = debounce((text: string) => {
    const params = new URLSearchParams(searchParams);
    if (text === '') {
      params.delete('search');
    } else {
      params.set('search', text);
    }
    router.push(`${pathName}?${params.toString()}`);
  }, 800);

  const debounceChangeFilters = debounce((filters: IFilters) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(filters).map(([key, value]) => {
      if (value.toString() === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathName}?${params.toString()}`);
  }, 800);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient, searchParams]);

  return (
    <Fragment>
      <Header initialSearchText={searchParams.get('search') || ''} onClickLogo={() => setReset(reset + 1)} onSearch={(text) => debounceChangeSearchText(text)} reset={reset} />
      <Flex flexGrow="1" width="100%" justify="center" align="center">
        <Flex width="100%" height="100%" pt="30px" gap="8">
          <Filters
            initialData={{
              categories: (searchParams.get('categories')?.split(',').filter(item => item !== '') || []) as EProductCategory[],
              minPrice: Number(searchParams.get('minPrice')) || MIN_PRICE,
              maxPrice: Number(searchParams.get('maxPrice')) || MAX_PRICE,
              sizes: (searchParams.get('sizes')?.split(',').filter(item => item !== '') || []) as EProductSize[],
              tones: (searchParams.get('tones')?.split(',').filter(item => item !== '') || []) as EProductTone[],
            }}
            priceRange={{ min: MIN_PRICE, max: MAX_PRICE }}
            onChange={(value) => debounceChangeFilters(value)}
            reset={reset}
          />
          <Flex flexGrow='1' direction="column" gap="3" justify={products?.length ? 'start' : 'center'} align={products?.length ? 'start' : 'center'}>
            {products ? (
              <ProductList products={products} reset={reset} />
            ) : (
              <Spinner size="3" />
            )}
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Fragment>
  );
}
