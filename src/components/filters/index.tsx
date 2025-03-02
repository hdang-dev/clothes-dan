"use client";

import { Flex, CheckboxGroup, Slider, Text } from "@radix-ui/themes";
import { EProductCategory, EProductSize, EProductTone, IFilters } from "@/interfaces";
import { formatPrice } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

const MIN_PRICE = 0;
const MAX_PRICE = 150;

// export function Filters({ priceRange, onChange, reset }: { priceRange: { min: number; max: number }; onChange: (value: IFilters) => void; reset: number }) {
export function Filters() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<IFilters>({
    categories: (searchParams
      .get("categories")
      ?.split(",")
      .filter((item) => item !== "") || []) as EProductCategory[],
    minPrice: Number(searchParams.get("minPrice")) || MIN_PRICE,
    maxPrice: Number(searchParams.get("maxPrice")) || MAX_PRICE,
    sizes: (searchParams
      .get("sizes")
      ?.split(",")
      .filter((item) => item !== "") || []) as EProductSize[],
    tones: (searchParams
      .get("tones")
      ?.split(",")
      .filter((item) => item !== "") || []) as EProductTone[],
  });
  const { categories, minPrice, maxPrice, sizes, tones } = data;
  const router = useRouter();
  const pathName = usePathname();

  const changeData = (value: IFilters) => {
    setData(value);
    debounceChangeFilters(value);
  };

  const debounceChangeFilters = useMemo(
    () =>
      debounce((filters: IFilters) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(filters).map(([key, value]) => {
          if (value.toString() === "") {
            params.delete(key);
          } else {
            params.set(key, value);
          }
        });
        router.push(`${pathName}?${params.toString()}`);
      }, 500),
    [searchParams]
  );

  useEffect(() => {
    return () => {
      debounceChangeFilters.cancel();
    };
  }, [debounceChangeFilters]);

  return (
    <Flex direction="column" gap="6">
      <CheckboxGroupFilter title="Category" items={Object.values(EProductCategory)} value={categories} onChange={(values) => changeData({ ...data, categories: values })} />
      <RangeFilter title="Price" min={MIN_PRICE} max={MAX_PRICE} value={[minPrice, maxPrice]} onChange={([minPrice, maxPrice]) => changeData({ ...data, minPrice, maxPrice })} />
      <CheckboxGroupFilter title="Size" items={Object.values(EProductSize)} value={sizes} onChange={(values) => changeData({ ...data, sizes: values })} />
      <CheckboxGroupFilter title="Tone" items={Object.values(EProductTone)} value={tones} onChange={(values) => changeData({ ...data, tones: values })} />
    </Flex>
  );
}

function CheckboxGroupFilter<T extends string>({ title, items, value, onChange }: { title: string; items: T[]; value: T[]; onChange: (values: T[]) => void }) {
  return (
    <Flex direction="column" gap="3">
      <Text weight="medium">{title}</Text>
      <CheckboxGroup.Root value={value} onValueChange={(values) => onChange(values as T[])}>
        {items.map((item, index) => (
          <CheckboxGroup.Item key={index} value={item}>
            {item}
          </CheckboxGroup.Item>
        ))}
      </CheckboxGroup.Root>
    </Flex>
  );
}

function RangeFilter({ title, min, max, value, onChange }: { title: string; min: number; max: number; value: number[]; onChange: (values: number[]) => void }) {
  return (
    <Flex direction="column" gap="3">
      <Text weight="medium">{title}</Text>
      <Flex minWidth="200px" direction="column" gap="2">
        <Slider value={value} min={min} max={max} step={2} minStepsBetweenThumbs={2} onValueChange={(value) => onChange(value)} />
        <Flex justify="between">
          <Text>{formatPrice(value[0])}</Text>
          <Text>{formatPrice(value[1])}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
