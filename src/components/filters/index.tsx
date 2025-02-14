"use client";

import { Flex, CheckboxGroup, Slider, Text } from "@radix-ui/themes";
import { EProductCategory, EProductSize, EProductTone } from "@/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { formatPrice } from "@/utils";
import { useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 150;

export function Filters() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const categories = searchParams.get('categories')?.split(',').filter(item => item !== '') || [];
  const minPrice = Number(searchParams.get('minPrice')) || MIN_PRICE;
  const maxPrice = Number(searchParams.get('maxPrice')) || MAX_PRICE;
  const sizes = searchParams.get('sizes')?.split(',').filter(item => item !== '') || [];
  const tones = searchParams.get('tones')?.split(',').filter(item => item !== '') || [];

  if (minPrice > maxPrice || minPrice < MIN_PRICE || maxPrice > MAX_PRICE) {
    router.push('/');
    return;
  }

  const changeFilter = (key: string, values: number[] | string[]) => {
    const params = new URLSearchParams(searchParams);
    if (key === 'price') {
      params.set('minPrice', values[0].toString());
      params.set('maxPrice', values[1].toString());
    } else {
      if (values.length) {
        params.set(key, values.toString());
      } else {
        params.delete(key);
      }
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  const debounceChangeFilter = debounce((key: string, values: number[] | string[]) => {
    changeFilter(key, values);
  }, 800);

  return (
    <Flex direction="column" gap="6">
      <CheckboxGroupFilter title="Category" items={Object.values(EProductCategory)} defaultValue={categories} onChange={(values) => debounceChangeFilter('categories', values)} />
      <RangeFilter title="Price" min={MIN_PRICE} max={MAX_PRICE} defaultValue={[minPrice, maxPrice]} onChange={(values) => debounceChangeFilter('price', values)} />
      <CheckboxGroupFilter title="Size" items={Object.values(EProductSize)} defaultValue={sizes} onChange={(values) => debounceChangeFilter('sizes', values)} />
      <CheckboxGroupFilter title="Tone" items={Object.values(EProductTone)} defaultValue={tones} onChange={(values) => debounceChangeFilter('tones', values)} />
    </Flex>
  );
}

function CheckboxGroupFilter({ title, items, defaultValue, onChange }: { title: string, items: string[]; defaultValue: string[]; onChange: (values: string[]) => void; }) {
  return (
    <Flex direction="column" gap="3">
      <Text weight="medium">{title}</Text>
      <CheckboxGroup.Root defaultValue={defaultValue} onValueChange={(values) => onChange(values)}>
        {items.map((item, index) => (
          <CheckboxGroup.Item key={index} value={item}>{item}</CheckboxGroup.Item>
        ))}
      </CheckboxGroup.Root>
    </Flex>
  );
}

function RangeFilter({ title, min, max, defaultValue, onChange }: { title: string, min: number; max: number; defaultValue: number[], onChange: (values: number[]) => void; }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  return (
    <Flex direction="column" gap="3">
      <Text weight="medium">{title}</Text>
      <Flex minWidth="200px" direction="column" gap="2">
        <Slider
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={2}
          minStepsBetweenThumbs={2}
          onValueChange={(value) => {
            setMinValue(value[0]);
            setMaxValue(value[1]);
            onChange(value);
          }}
        />
        <Flex justify="between">
          <Text>{formatPrice(minValue)}</Text>
          <Text>{formatPrice(maxValue)}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
