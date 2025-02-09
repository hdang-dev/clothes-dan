"use client";
import { Flex, CheckboxGroup, Slider, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FILTER_FIELDS } from "./data";
import { formatPrice } from "@/utils";

export function Filter() {
  return (
    <Flex direction="column" gap="6">
      {FILTER_FIELDS.map((field, index) => (
        <Flex key={index} direction="column" gap="3">
          <Text weight="medium">{field.title}</Text>
          {field.type === "checkbox-group" && <CheckboxGroupFilter items={field.items} />}
          {field.type === "range" && <RangeFilter min={field.min} max={field.max} step={field.step} onValueChange={() => {}} />}
        </Flex>
      ))}
    </Flex>
  );
}

function CheckboxGroupFilter({ items }: { items: string[] }) {
  return (
    <CheckboxGroup.Root defaultValue={[items[0]]}>
      {items.map((item, index) => (
        <Text key={index} as="label">
          <Flex gap="2">
            <CheckboxGroup.Item value={item} /> {item}
          </Flex>
        </Text>
      ))}
    </CheckboxGroup.Root>
  );
}

function RangeFilter({ min, max, step, onValueChange }: { min: number; max: number; step: number; onValueChange: (newMin: number, newMax: number) => void }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  return (
    <Flex minWidth="200px" direction="column" gap="2">
      <Slider
        defaultValue={[min, max]}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={2}
        onValueChange={([newMin, newMax]) => {
          setMinValue(newMin);
          setMaxValue(newMax);
          onValueChange(newMin, newMax);
        }}
      />
      <Flex justify="between">
        <Text>{formatPrice(minValue)}</Text>
        <Text>{formatPrice(maxValue)}</Text>
      </Flex>
    </Flex>
  );
}
