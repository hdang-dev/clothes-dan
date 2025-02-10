"use client";

import { Flex, CheckboxGroup, Slider, Text } from "@radix-ui/themes";
import { useState } from "react";
import { formatPrice } from "@/utils";
import { TFilter } from "@/interfaces";

interface IFiltersProps {
  items: TFilter[];
  onChange: (change: TFilter) => void;
}

export function Filters({ items, onChange }: IFiltersProps) {
  return (
    <Flex direction="column" gap="6">
      {items.map((field, index) => (
        <Flex key={index} direction="column" gap="3">
          <Text weight="medium">{field.key}</Text>
          {field.type === "checkbox-group" && (
            <CheckboxGroupFilter items={field.items} onChange={(values) => onChange({ ...field, items: values })} />
          )}
          {field.type === "range" && (
            <RangeFilter min={field.min} max={field.max} onChange={([newMin, newMax]) => onChange({ ...field, min: newMin, max: newMax })} />
          )}
        </Flex>
      ))}
    </Flex>
  );
}

function CheckboxGroupFilter({ items, onChange }: { items: string[]; onChange: (values: string[]) => void; }) {
  return (
    <CheckboxGroup.Root onValueChange={(values) => onChange(values)}>
      {items.map((item, index) => (
        <CheckboxGroup.Item key={index} value={item}>{item}</CheckboxGroup.Item>
      ))}
    </CheckboxGroup.Root>
  );
}

function RangeFilter({ min, max, onChange }: { min: number; max: number; onChange: (values: number[]) => void; }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  return (
    <Flex minWidth="200px" direction="column" gap="2">
      <Slider
        defaultValue={[min, max]}
        min={min}
        max={max}
        step={2}
        minStepsBetweenThumbs={2}
        onValueChange={([newMin, newMax]) => {
          setMinValue(newMin);
          setMaxValue(newMax);
          onChange([newMin, newMax]);
        }}
      />
      <Flex justify="between">
        <Text>{formatPrice(minValue)}</Text>
        <Text>{formatPrice(maxValue)}</Text>
      </Flex>
    </Flex>
  );
}
