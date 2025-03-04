/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Flex, CheckboxGroup, Slider, Text } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EProductCategory, EProductSize, EProductTone, IFilters } from "@/interfaces";
import { formatPrice } from "@/utils";

const MIN_PRICE = 0;
const MAX_PRICE = 150;

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      Object.entries(data).map(([key, value]) => {
        if (value.toString() === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathName}?${params.toString()}`);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  return (
    <Flex direction="column" gap="6">
      <CheckboxGroupFilter title="Category" items={Object.values(EProductCategory)} value={categories} onChange={(values) => setData({ ...data, categories: values })} />
      <RangeFilter title="Price" min={MIN_PRICE} max={MAX_PRICE} value={[minPrice, maxPrice]} onChange={([minPrice, maxPrice]) => setData({ ...data, minPrice, maxPrice })} />
      <CheckboxGroupFilter title="Size" items={Object.values(EProductSize)} value={sizes} onChange={(values) => setData({ ...data, sizes: values })} />
      <CheckboxGroupFilter title="Tone" items={Object.values(EProductTone)} value={tones} onChange={(values) => setData({ ...data, tones: values })} />
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
