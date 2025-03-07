"use client";

import { Flex, Grid, Select, Text } from "@radix-ui/themes";
import { ProductGroupCard } from "../productGroupCard";
import { ESortType, IProductGroup } from "@/interfaces";
import { useState } from "react";

const sortedProductGroups = (productGroups: IProductGroup[], sortType: ESortType): IProductGroup[] => {
  if (sortType === ESortType.LOW_TO_HIGH) {
    return productGroups.sort((prev, next) => (prev.lowestPrice > next.lowestPrice ? 1 : -1));
  }
  return productGroups.sort((prev, next) => (prev.lowestPrice > next.lowestPrice ? -1 : 1));
};

export function ProductGroupList({ data }: { data: IProductGroup[]; }) {
  const [sortType, setSortType] = useState<ESortType>(ESortType.LOW_TO_HIGH);

  return (
    <>
      {data.length > 0 ? (
        <>
          <Flex width="100%" justify="between">
            <Text>Found {data.length} product(s)</Text>
            <Select.Root size="2" value={sortType} onValueChange={(value) => setSortType(value as ESortType)}>
              <Select.Trigger />
              <Select.Content>
                {Object.values(ESortType).map((sortType) => (
                  <Select.Item key={sortType} value={sortType}>
                    {sortType}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
          <Grid width="100%" height="max-content" columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
            {sortedProductGroups(data, sortType).map((productGroup) => (
              <ProductGroupCard key={productGroup.key} data={productGroup} />
            ))}
          </Grid>
        </>
      ) : (
        <Text>No product matches</Text>
      )}
    </>
  );
}
