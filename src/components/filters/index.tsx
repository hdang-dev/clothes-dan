"use client";

import { Flex, CheckboxGroup, Slider, Text } from "@radix-ui/themes";
import { EProductCategory, EProductSize, EProductTone, IFilters } from "@/interfaces";
import { formatPrice } from "@/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function Filters({ priceRange, onChange, reset }: { priceRange: { min: number; max: number }; onChange: (value: IFilters) => void; reset: number }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<IFilters>({
    categories: (searchParams
      .get("categories")
      ?.split(",")
      .filter((item) => item !== "") || []) as EProductCategory[],
    minPrice: Number(searchParams.get("minPrice")) || priceRange.min,
    maxPrice: Number(searchParams.get("maxPrice")) || priceRange.max,
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

  const changeData = (value: IFilters) => {
    setData(value);
    onChange(value);
  };

  useEffect(() => {
    setData({
      categories: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sizes: [],
      tones: [],
    });
  }, [priceRange.max, priceRange.min, reset]);

  return (
    <Flex direction="column" gap="6">
      <CheckboxGroupFilter title="Category" items={Object.values(EProductCategory)} value={categories} onChange={(values) => changeData({ ...data, categories: values })} />
      <RangeFilter title="Price" min={priceRange.min} max={priceRange.max} value={[minPrice, maxPrice]} onChange={([minPrice, maxPrice]) => changeData({ ...data, minPrice, maxPrice })} />
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
